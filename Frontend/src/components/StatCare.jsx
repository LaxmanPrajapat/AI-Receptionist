import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center">

          <div>
            <p className="text-gray-500 text-sm">
              {title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {value}
            </h2>
          </div>

          <div>
            {icon}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}