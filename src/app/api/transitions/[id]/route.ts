import { connectDB } from '@/lib/mongodb';
import { Transition } from '@/models/Transition';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(_: Request, { params }: Params) {
  await connectDB(); 

  const deleted = await Transition.findByIdAndDelete(params.id);
  if (!deleted) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Deleted' });
}

export async function PUT(req: Request, { params }: Params) {
  await connectDB();
  const body = await req.json();

  const updated = await Transition.findByIdAndUpdate(
    params.id,
    {
      type: body.type,
      value: body.value,
      processDate: new Date(body.processDate),
    },
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ message: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(updated);
}
