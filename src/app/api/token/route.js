import { NextResponse } from 'next/server';
import Ably from 'ably';
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export default async function GET() {
  const client = new Ably.Rest(process.env.ABLY_CLIENT_API_KEY);

  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
  });

  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: randomName,
  });

  return NextResponse.json(tokenRequestData);
}
