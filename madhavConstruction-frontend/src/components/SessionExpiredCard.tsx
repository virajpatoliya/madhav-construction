// src/components/SessionExpiredCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
    onRelogin: () => void;
}

export default function SessionExpiredCard({ onRelogin }: Props) {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-black/90">
            <Card className="max-w-sm p-4  rounded-3xl">
                <CardContent className="space-y-4 text-center">
                    <h2 className="text-xl font-semibold text-red-600">
                        Session Expired
                    </h2>
                    <p className="text-gray-600">
                        Your session has been expired. Please log in again to continue.
                    </p>
                    <Button color="bg-blue-950" onClick={onRelogin}>Re-login</Button>
                </CardContent>
            </Card>
        </div>
    );
}
