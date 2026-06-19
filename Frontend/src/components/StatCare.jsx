import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <Card
      className="
        relative
        overflow-hidden
        border-0
        shadow-md
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        rounded-2xl
      "
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500" />

      <CardContent className="p-6">
        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm font-medium text-gray-500">
              {title}
            </p>

            <h2 className="text-4xl font-bold mt-2 text-gray-800">
              {value}
            </h2>
          </div>

          <div
            className="
              h-14
              w-14
              rounded-2xl
              bg-blue-100
              text-blue-600
              flex
              items-center
              justify-center
              shadow-sm
            "
          >
            {icon}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}