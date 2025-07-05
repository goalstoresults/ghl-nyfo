export async function onRequestPost({ request, env }) {
  const body = await request.json();
  const { source_id, related_id, relationship_type, role, notes } = body;

  if (!source_id || !related_id || !relationship_type) {
    return new Response("Missing required fields", { status: 400 });
  }

  const relationshipId = `rel-${source_id}-${related_id}`;

  const res = await fetch(`${env.BASEROW_API_URL}/rows/table/${env.RELATIONSHIPS_TABLE_ID}/`, {
    method: "POST",
    headers: {
      Authorization: `Token ${env.BASEROW_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "Relationship ID": relationshipId,
      "Source Contact": [source_id],
      "Related Contact": [related_id],
      "Relationship Type": relationship_type,
      "Relationship Role": role || "",
      "Notes": notes || ""
    }),
  });

  const result = await res.json();
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" },
  });
}
