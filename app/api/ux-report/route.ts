import { NextResponse } from 'next/server'
import { UXReport, addUXReport as addUXReportToKnowledgeBase, knowledgeBase } from '@/lib/agent/knowledgeBase'
import { analyzeWebsite } from '@/lib/utils/websiteAnalyzer'
import { crawlGoogleReviews } from '@/lib/utils/googleReviewsCrawler'
import { processAllReports } from '@/lib/utils/reportExtractor'

/**
 * API endpoint to add UX reports to the knowledge base
 * Can accept manual reports or attempt to scrape from URLs
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { url, reportData, manual, analyzeWebsite: shouldAnalyzeWebsite, crawlGoogleReviews: shouldCrawlGoogleReviews, processPDFs } = body

    // If user wants to process all PDFs from public/reports/
    if (processPDFs) {
      const openaiApiKey = process.env.OPENAI_API_KEY
      if (!openaiApiKey) {
        return NextResponse.json({
          success: false,
          error: 'OPENAI_API_KEY not configured',
        }, { status: 400 })
      }

      const results = await processAllReports(openaiApiKey)
      return NextResponse.json({
        success: true,
        message: `Processed ${results.processed} reports, ${results.failed} failed`,
        results,
      })
    }

    // If manual report data is provided, add it directly
    if (manual && reportData) {
      const normalizedSource = String(reportData.source || 'Manual').replace(/jurnii/gi, 'External Report')
      const normalizedSourceUrl = typeof reportData.sourceUrl === 'string'
        ? reportData.sourceUrl.replace(/jurnii\.io/gi, 'redacted.example')
        : url

      const report: UXReport = {
        id: reportData.id || `ux-${Date.now()}`,
        source: normalizedSource,
        sourceUrl: normalizedSourceUrl,
        title: reportData.title || 'UX Report',
        date: reportData.date || new Date().toISOString().split('T')[0],
        findings: reportData.findings || [],
        summary: reportData.summary,
        priority: reportData.priority,
      }

      await addUXReportToKnowledgeBase(report)

      return NextResponse.json({
        success: true,
        message: 'UX report added to knowledge base',
        reportId: report.id,
      })
    }

    // If URL is provided, attempt to extract data
    if (url) {
      const openaiApiKey = process.env.OPENAI_API_KEY
      const googleApiKey = process.env.GOOGLE_API_KEY
      const googleCseId = process.env.GOOGLE_CSE_ID

      if (url.includes('jurnii.io')) {
        return NextResponse.json({
          success: false,
          error: 'Legacy external report ingestion has been disabled for this project.',
        }, { status: 400 })
      }

      // If it's a website URL and user wants analysis, analyze it as a UX expert
      if (shouldAnalyzeWebsite && openaiApiKey) {
        try {
          console.log(`Analyzing website: ${url}`)
          const analysis = await analyzeWebsite(url, openaiApiKey)
          
          if (analysis && analysis.findings && analysis.findings.length > 0) {
            const report: UXReport = {
              id: `website-${Date.now()}`,
              source: 'Website Analysis',
              sourceUrl: url,
              title: analysis.title,
              date: analysis.date,
              findings: analysis.findings.map((f: any) => ({
                issue: f.issue,
                severity: f.severity,
                description: f.description,
                recommendation: f.recommendation,
                affectedArea: f.affectedArea || 'General',
              })),
              summary: analysis.summary,
              priority: 'high',
            }

            await addUXReportToKnowledgeBase(report)

            return NextResponse.json({
              success: true,
              message: 'Website analyzed and UX findings added to knowledge base',
              reportId: report.id,
              findingsCount: report.findings.length,
              strengths: analysis.strengths || [],
            })
          }
        } catch (websiteError: any) {
          console.error('Website analysis failed:', websiteError)
          return NextResponse.json({
            success: false,
            error: `Website analysis failed: ${websiteError.message}`,
          }, { status: 500 })
        }
      }

      // --- 3. Google Web Search (articles, reviews, news, etc.) (if requested) ---
      if (shouldCrawlGoogleReviews && openaiApiKey && googleApiKey && googleCseId) {
        try {
          console.log(`Searching Google for articles, reviews, and content about: ${url}`)
          const searchSummary = await crawlGoogleReviews(url, googleApiKey, googleCseId, openaiApiKey)

          if (searchSummary) {
            const report: UXReport = {
              id: `google-search-${Date.now()}`,
              source: searchSummary.source || 'Google Web Search',
              sourceUrl: url,
              title: `Web Content Analysis for ${new URL(url).hostname}`,
              date: new Date().toISOString().split('T')[0],
              findings: searchSummary.findings.map(f => ({
                issue: f.issue,
                severity: f.severity,
                description: f.description,
                recommendation: f.recommendation,
                affectedArea: f.affectedArea,
              })),
              summary: searchSummary.summary,
              priority: 'medium', // Default priority for web content
              overallRating: searchSummary.overallRating,
              totalReviews: searchSummary.totalReviews,
              themes: searchSummary.themes,
            }
            await addUXReportToKnowledgeBase(report)
            return NextResponse.json({
              success: true,
              message: 'Google web search completed and insights added to knowledge base',
              reportId: report.id,
              findingsCount: report.findings.length,
              overallRating: report.overallRating,
              totalReviews: report.totalReviews,
              articleCount: searchSummary.articleCount,
              contentTypes: searchSummary.contentTypes,
            })
          }
        } catch (reviewError: any) {
          console.error('Google web search failed:', reviewError)
          return NextResponse.json({
            success: false,
            error: `Google web search failed: ${reviewError.message}`,
          }, { status: 500 })
        }
      }

      // If scraping failed or credentials not available, return instructions
      return NextResponse.json({
        success: false,
        message: 'Automatic extraction not available for this URL. Please use manual input.',
        instructions: {
          step1: 'Visit the report URL',
          step2: 'Copy the report findings',
          step3: 'Use the manual input format below',
          manualFormat: {
            id: 'manual-001',
            source: 'Manual',
            sourceUrl: url,
            title: 'UX Report - Site Improvements',
            date: '2024-01-15',
            findings: [
              {
                issue: 'Issue title',
                severity: 'high',
                description: 'Detailed description',
                recommendation: 'Recommended solution',
                affectedArea: 'Navigation',
              },
            ],
            summary: 'Overall summary',
            priority: 'high',
          },
        },
      })
    }

    return NextResponse.json(
      { success: false, error: 'Either url or manual reportData must be provided' },
      { status: 400 }
    )
  } catch (error) {
    console.error('UX Report API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process UX report' },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint to retrieve all UX reports
 */
export async function GET() {
  try {
    const reports: UXReport[] = knowledgeBase.uxReports.filter((report) => {
      const source = String(report.source || '')
      const sourceUrl = String(report.sourceUrl || '')
      return !/jurnii/i.test(source) && !/jurnii\.io/i.test(sourceUrl)
    })
    
    return NextResponse.json({
      success: true,
      reports,
      count: reports.length,
    })
  } catch (error) {
    console.error('UX Report GET error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve UX reports' },
      { status: 500 }
    )
  }
}
