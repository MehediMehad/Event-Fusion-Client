"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ReusableTable } from "./ReusableTable"

export function UsersManagementTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(productData.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = productData.slice(startIndex, startIndex + itemsPerPage)

  const columns = [
    {
      header: "Product",
      cell: (product: any) => (
        <div className="flex items-center gap-3">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={40}
            height={60}
            className="object-contain"
          />
          <span>{product.name}</span>
        </div>
      ),
    },
    {
      header: "Product Catalogs",
      cell: (product: any) => product.catalog,
    },
    {
      header: "Product Type",
      cell: (product: any) => product.type,
    },
    {
      header: "Price",
      cell: (product: any) => product.price,
    },
    {
      header: "Star",
      cell: (product: any) => product.star,
    },
    {
      header: "Product Quantity",
      cell: (product: any) => product.quantity,
    },
    {
      header: "Action",
      cell: (product: any) => (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
            Delete
          </Button>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            Add incentive
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      <ReusableTable data={currentProducts} columns={columns} />

      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {[...Array(Math.min(5, totalPages))].map((_, i) => {
          let pageNumber: number

          if (totalPages <= 5) {
            pageNumber = i + 1
          } else if (currentPage <= 3) {
            pageNumber = i + 1
            if (i === 4) pageNumber = totalPages
          } else if (currentPage >= totalPages - 2) {
            pageNumber = totalPages - 4 + i
            if (i === 0) pageNumber = 1
          } else {
            pageNumber = currentPage - 2 + i
            if (i === 0) pageNumber = 1
            if (i === 4) pageNumber = totalPages
          }

          const isEllipsis = (i === 0 && pageNumber !== 1) || (i === 4 && pageNumber !== totalPages)

          if (isEllipsis) {
            return (
              <div key={i} className="px-3 py-2">
                ...
              </div>
            )
          }

          return (
            <Button
              key={i}
              variant={currentPage === pageNumber ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(pageNumber)}
              className={currentPage === pageNumber ? "bg-red-600 hover:bg-red-700" : ""}
            >
              {pageNumber}
            </Button>
          )
        })}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
