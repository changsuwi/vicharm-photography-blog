'use client'
import useScrollTrack, { ScrollTrackType } from "../hooks/useScrollTrack";

export default function ScrollTracker({id, type}: {id: string, type: ScrollTrackType}) {
  useScrollTrack(id, type);
  return (
    <></>
  )
}