import { serve } from "https://deno.land/std@0.190.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const ADMIN_EMAIL = Deno.env.get('ADMIN_EMAIL')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface UserData {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  company?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Starting notify-admin-signup function')
    
    if (!RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY')
      throw new Error('Missing RESEND_API_KEY')
    }

    if (!ADMIN_EMAIL) {
      console.error('Missing ADMIN_EMAIL')
      throw new Error('Missing ADMIN_EMAIL')
    }

    const { user } = await req.json()
    console.log('Received signup notification for user:', user)

    // Format the email content
    const emailHtml = `
      <h2>New User Signup</h2>
      <p>A new user has signed up for MovementBrand:</p>
      <ul>
        <li><strong>Email:</strong> ${user.email}</li>
        <li><strong>Name:</strong> ${user.first_name || ''} ${user.last_name || ''}</li>
        ${user.company ? `<li><strong>Company:</strong> ${user.company}</li>` : ''}
      </ul>
    `

    console.log('Sending email to admin')
    
    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'MovementBrand <onboarding@resend.dev>',
        to: [ADMIN_EMAIL],
        subject: 'New User Signup - MovementBrand',
        html: emailHtml,
      }),
    })

    const responseText = await res.text()
    console.log('Resend API response:', responseText)

    if (!res.ok) {
      throw new Error(`Failed to send email: ${responseText}`)
    }

    const data = await JSON.parse(responseText)
    console.log('Email sent successfully:', data)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error in notify-admin-signup function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
}

serve(handler)