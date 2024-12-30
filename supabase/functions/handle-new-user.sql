CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_url text;
  v_api_key text;
  v_response text;
BEGIN
  -- Insert into profiles as before
  INSERT INTO public.profiles (
    id,
    email,
    first_name,
    last_name,
    company,
    website_url,
    phone_number
  )
  VALUES (
    new.id,
    new.email,
    COALESCE((new.raw_user_meta_data->>'first_name')::text, null),
    COALESCE((new.raw_user_meta_data->>'last_name')::text, null),
    COALESCE((new.raw_user_meta_data->>'company')::text, null),
    COALESCE((new.raw_user_meta_data->>'website_url')::text, null),
    COALESCE((new.raw_user_meta_data->>'phone_number')::text, null)
  )
  ON CONFLICT (id) DO UPDATE
  SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    company = EXCLUDED.company,
    website_url = EXCLUDED.website_url,
    phone_number = EXCLUDED.phone_number;

  -- Get the Supabase URL and anon key from secrets
  SELECT value INTO v_url FROM vault.decrypted_secrets WHERE name = 'SUPABASE_URL';
  SELECT value INTO v_api_key FROM vault.decrypted_secrets WHERE name = 'SUPABASE_ANON_KEY';

  -- Call the edge function to notify admin with better error handling
  BEGIN
    SELECT INTO v_response
      net.http_post(
        v_url || '/functions/v1/notify-admin-signup',
        jsonb_build_object(
          'user', jsonb_build_object(
            'id', new.id,
            'email', new.email,
            'first_name', (new.raw_user_meta_data->>'first_name')::text,
            'last_name', (new.raw_user_meta_data->>'last_name')::text,
            'company', (new.raw_user_meta_data->>'company')::text
          )
        )::text,
        'application/json',
        ARRAY[
          net.http_header('Authorization', 'Bearer ' || v_api_key),
          net.http_header('Content-Type', 'application/json')
        ]
      );
    
    -- Log the response for debugging
    RAISE NOTICE 'Edge function response: %', v_response;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log the error but don't fail the transaction
      RAISE WARNING 'Failed to notify admin: % %', SQLERRM, SQLSTATE;
  END;

  RETURN new;
END;
$$;