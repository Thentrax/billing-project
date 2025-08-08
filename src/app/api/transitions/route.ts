import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Transition } from '@/models/Transition';

export async function GET() {
  await connectDB();
  const transitions = await Transition.find().sort({ processDate: -1 });
  return NextResponse.json(transitions);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();

  const newTransition = await Transition.create({
    type: body.type,
    value: body.value,
    processDate: new Date(body.processDate),
  });

  return NextResponse.json(newTransition, { status: 201 });
}
