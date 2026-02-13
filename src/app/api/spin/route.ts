import { NextResponse } from "next/server";
import { rollSpin } from "@/server/spin";
import { SPIN_COST } from "@/lib/constants";

let POINT_BALANCE = 500; // sementara (nanti dari DB)

export async function POST() {
  if (POINT_BALANCE < SPIN_COST) {
    return NextResponse.json(
      { error: "Not enough points" },
      { status: 400 }
    );
  }

  POINT_BALANCE -= SPIN_COST;
  const reward = rollSpin();
  POINT_BALANCE += reward.amount;

  return NextResponse.json({
    reward,
    balance: POINT_BALANCE,
  });
}
