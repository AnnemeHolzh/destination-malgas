"use client"

import { useEffect, useState } from 'react'
import { getAllHouses, updateHouse } from '../../../services/houseService'
import { House } from '../../../DataModels/House'
import Image from 'next/image'

export default function HideHouse() {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Hide House</h2>
        <p className="text-gray-600">
          This feature will allow you to hide a house from the system.
          Implementation coming soon.
        </p>
      </div>
    )
  } 