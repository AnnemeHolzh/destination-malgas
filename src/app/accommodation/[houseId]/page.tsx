import { getHouseById } from '@/app/services/houseService'
import { House } from '@/app/DataModels/House'

export default async function HousePage({
  params,
}: {
  params: { houseId: string }
}) {
  const house = await getHouseById(params.houseId)

  if (!house) {
    return <div>House not found</div>
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold">{house.name}</h1>
      {/* Add house details here */}
    </div>
  )
}