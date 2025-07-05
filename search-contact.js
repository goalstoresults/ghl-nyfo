export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q");

  if (!query) {
    return new Response(JSON.stringify([]), { status: 200 });
  }

  const res = await fetch(`${env.BASEROW_API_URL}/rows/table/${env.CONTACTS_TABLE_ID}/?user_field_names=true&search=${encodeURIComponent(query)}`, {
    headers: {
      Authorization: `Token ${env.BASEROW_API_TOKEN}`,
    },
  });

  const data = await res.json();

  const results = data.results.map(row => ({
    id: row["id"],
    ghl_id: row["GHL Contact ID"],
    name: row["Name"],
    email: row["Email"],
  }));

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
