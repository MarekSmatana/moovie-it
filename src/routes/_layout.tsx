import { SearchIcon, StarIcon } from "@chakra-ui/icons"
import { Button, Flex, HStack, VStack, useColorMode } from "@chakra-ui/react"
import React from "react"
import { Link, Outlet } from "react-router-dom"

export default function RootLayout() {
  const { setColorMode } = useColorMode()

  React.useEffect(() => {
    setColorMode("dark")
  }, [setColorMode])

  return (
    <VStack>
      <Flex as="nav" w="full" bg="Menu" justify="center">
        <HStack
          justify="space-between"
          alignItems="center"
          w="full"
          px={8}
          py={2}
          maxW={1080}
        >
          <Link to="/">
            <Button variant="nav" fontWeight="black">
              Moovie It 🎥
            </Button>
          </Link>
          <HStack>
            <Link to="/">
              <Button
                variant="nav"
                _hover={{ textColor: "dodgerblue" }}
                leftIcon={<SearchIcon />}
              >
                Search
              </Button>
            </Link>
            <Link to="/favorites">
              <Button
                variant="nav"
                _hover={{ textColor: "dodgerblue" }}
                leftIcon={<StarIcon />}
              >
                Favorites
              </Button>
            </Link>
          </HStack>
        </HStack>
      </Flex>
      <nav></nav>
      <Outlet />
    </VStack>
  )
}
