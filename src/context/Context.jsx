import { useState, useEffect } from "react"
import { createContext } from "react"

export const Context = createContext();

export const ActionContext = ({ children }) => {
  const [likedList, setLikedList] = useState(
    JSON.parse(localStorage.getItem("likedList")) || []
  )
  const [savedList, setSavedList] = useState(
    JSON.parse(localStorage.getItem("savedList")) || []
  )

  useEffect(() => {
    localStorage.setItem("likedList", JSON.stringify(likedList))
  }, [likedList])

  useEffect(() => {
    localStorage.setItem("savedList", JSON.stringify(savedList))
  }, [savedList])

  return (
    <Context.Provider value={{ likedList, setLikedList, savedList, setSavedList }}>{children}</Context.Provider>)}
