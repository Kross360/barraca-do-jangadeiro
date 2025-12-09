import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fwsmyncbgzxkydydginv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3c215bmNiZ3p4a3lkeWRnaW52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODkwMDAsImV4cCI6MjA4MDg2NTAwMH0.NGX4SzKcsu2Iy8OaaW2BSMEAG6D6o1L0J7NLbModj-s';

export const supabase = createClient(supabaseUrl, supabaseKey);