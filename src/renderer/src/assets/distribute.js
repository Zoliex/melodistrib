const distributeTracks = (tracks, musicians, selectedTracks) => {
  const tracksWithMusicians = {}

  // Initializing data structure for distribution
  tracks.forEach((track) => {
    tracksWithMusicians[track.uuid] = {
      trackDetails: track,
      assignedMusicians: [],
      rejectedMusicians: [] // Add a property for rejected musicians
    }
  })

  const tracksInfoByMusician = {} // To store information about tracks chosen by each musician
  musicians.forEach((musician) => {
    tracksInfoByMusician[musician.uuid] = {
      chosen: 0,
      initial: 0,
      played: 0
    }
    const musicianSelection = selectedTracks.find(
      (selection) => selection.musician === musician.uuid
    )
    tracksInfoByMusician[musician.uuid].initial = musicianSelection
      ? musicianSelection.tracks.length
      : 0
  })

  // Distributing tracks while respecting musicians' choices
  selectedTracks.forEach((selection) => {
    const musicianUUID = selection.musician
    const musician = musicians.find((m) => m.uuid === musicianUUID)
    const selectedTracksUUIDs = selection.tracks.filter((track) => {
      return tracks.some((t) => t.uuid === track && t.maxMusicians > 0)
    })

    selectedTracksUUIDs.forEach((trackUUID) => {
      const track = tracksWithMusicians[trackUUID]

      if (track.assignedMusicians.length < track.trackDetails.maxMusicians) {
        track.assignedMusicians.push({
          musician: musician,
          chosen: true
        })

        if (selection.tracks.includes(trackUUID)) {
          tracksInfoByMusician[musicianUUID].chosen++
        }
      } else {
        // If the musician is rejected, add them to the rejectedMusicians array
        track.rejectedMusicians.push(musician)
      }
    })
  })

  musicians.forEach((musician) => {
    // Calculating the number of tracks played by each musician
    const assignedTracks = Object.values(tracksWithMusicians).flatMap((track) =>
      track.assignedMusicians.map((m) => m.musician)
    )
    tracksInfoByMusician[musician.uuid].played = assignedTracks.filter(
      (m) => m.uuid === musician.uuid
    ).length
  })

  // Assigning remaining tracks to musicians fairly to ensure everyone participates
  const remainingTracks = Object.values(tracksWithMusicians).filter(
    (track) => track.assignedMusicians.length < track.trackDetails.maxMusicians
  )

  remainingTracks.forEach((track) => {
    const maxMusicians = track.trackDetails.maxMusicians
    const assignedMusiciansLength = track.assignedMusicians.length

    Array.from({ length: maxMusicians - assignedMusiciansLength }).forEach(() => {
      const availableMusicians = musicians.filter((musician) => {
        // Check if musician is not already assigned to the current track
        return !track.assignedMusicians.some((assigned) => assigned.musician.uuid === musician.uuid)
      })

      // Sort available musicians by the number of tracks they've played
      availableMusicians.sort((a, b) => {
        return tracksInfoByMusician[a.uuid].played - tracksInfoByMusician[b.uuid].played
      })

      // Assign the track to the musician with the least number of tracks played
      const musicianWithLeastTracks = availableMusicians[0]

      track.assignedMusicians.push({
        musician: musicianWithLeastTracks,
        chosen: false
      })

      tracksInfoByMusician[musicianWithLeastTracks.uuid].played++
    })
  })

  return { tracksWithMusicians, tracksInfoByMusician } // Returning the distribution of tracks for each musician and the information about tracks chosen by each musician
}

export default distributeTracks
