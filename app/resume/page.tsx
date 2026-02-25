import { redirect } from "next/navigation";
import { RESUME_URL } from "@/lib/constants";

export default function ResumePage() {
    redirect(RESUME_URL);
}
