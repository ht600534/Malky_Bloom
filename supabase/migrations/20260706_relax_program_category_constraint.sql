do $$
declare
  constraint_name text;
begin
  select con.conname
  into constraint_name
  from pg_constraint con
  join pg_class rel on rel.oid = con.conrelid
  join pg_namespace nsp on nsp.oid = rel.relnamespace
  where nsp.nspname = 'public'
    and rel.relname = 'programs'
    and con.contype = 'c'
    and pg_get_constraintdef(con.oid) ilike '%category%';

  if constraint_name is not null then
    execute format('alter table public.programs drop constraint %I', constraint_name);
  end if;
end
$$;