import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase';

// GET /api/brands?projectId=XYZ
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get('projectId');

  if (!projectId) {
    return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from('project_brands')
    .select('*')
    .eq('project_id', projectId)
    .maybeSingle();

  if (error) {
    console.error('[Brands GET] Supabase error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data || null);
}

// POST /api/brands
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body || !body.projectId) {
    return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });
  }

  const {
    projectId,
    businessName,
    industry,
    primaryColor,
    secondaryColor,
    tone,
    location,
    customAnswers,
    logoUrl,
  } = body;

  const supabase = createSupabaseAdminClient();

  // Check if brand context already exists for this project
  const { data: existing } = await supabase
    .from('project_brands')
    .select('id')
    .eq('project_id', projectId)
    .maybeSingle();

  const brandData = {
    project_id: projectId,
    business_name: businessName || null,
    industry: industry || null,
    primary_color: primaryColor || null,
    secondary_color: secondaryColor || null,
    tone: tone || null,
    location: location || null,
    custom_answers: customAnswers || {},
    logo_url: logoUrl || null,
    updated_at: new Date().toISOString(),
  };

  let result;
  if (existing) {
    result = await supabase
      .from('project_brands')
      .update(brandData)
      .eq('project_id', projectId)
      .select()
      .single();
  } else {
    result = await supabase
      .from('project_brands')
      .insert({
        ...brandData,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
  }

  if (result.error) {
    console.error('[Brands POST] Supabase error:', result.error);
    return NextResponse.json({ error: result.error.message }, { status: 500 });
  }

  return NextResponse.json(result.data);
}
