import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Box, HStack, IconButton } from "@chakra-ui/react"

type PaginationProps = {
  currentPage: number
  itemsCount: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  itemsCount,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(itemsCount / itemsPerPage)

  return (
    <HStack mt={4}>
      <IconButton
        variant="ghost"
        icon={<ChevronLeftIcon />}
        size="sm"
        fontSize="xl"
        aria-label="previous"
        onClick={() => {
          onPageChange(currentPage - 1)
        }}
        isDisabled={currentPage <= 1}
      />
      <Box>
        {currentPage} / {totalPages}
      </Box>
      <IconButton
        variant="ghost"
        icon={<ChevronRightIcon />}
        size="sm"
        fontSize="xl"
        aria-label="next"
        isDisabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1)
        }}
      />
    </HStack>
  )
}
