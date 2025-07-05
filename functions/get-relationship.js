export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const sourceId = url.searchParams.get("source_id");

  if (!sourceId) {
    return new Response("Missing source_id", { status: 400 });
  }

  const res = await fetch(`${env.BASEROW_API_URL}/rows/table/${env.RELATIONSHIPS_TABLE_ID}/?user_field_names=true`, {
    headers: {
      Authorization: `Token ${env.BASEROW_API_TOKEN}`,
    },
  });

  const data = await res.json();

  const filtered = data.results.filter(row => {
    return row["Source Contact"] && row["Source Contact"][0] && row["Source Contact"][0].value === sourceId;
  });

  return new Response(JSON.stringify(filtered), {
    headers: { "Content-Type": "application/json" },
  });
}
