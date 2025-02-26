import { NextResponse } from 'next/server'
import { logErrorToFirebase } from '../../services/errorService'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'image/svg+xml') {
      return NextResponse.json(
        { error: 'Only SVG files are allowed' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Svg = buffer.toString('base64')
    
    return NextResponse.json({
      svg: `data:image/svg+xml;base64,${base64Svg}`
    })
  } catch (error) {
    console.error('Error processing SVG:', error)
    await logErrorToFirebase(error, 'API/image-processing', {
      requestHeaders: request.headers
    })
    return NextResponse.json(
      { error: 'Failed to process SVG file' },
      { status: 500 }
    )
  }
} 