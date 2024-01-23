import { Box } from "@chakra-ui/react"

type ErrorTextProps = {
  text: string
}

export default function ErrorText({ text }: ErrorTextProps) {
  return (
    <Box
      as="h1"
      fontWeight="semibold"
      fontSize="lg"
      textColor="gray.400"
      mt={16}
    >
      {text}
    </Box>
  )
}
