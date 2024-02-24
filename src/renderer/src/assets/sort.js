function compareMusicians(track1, track2) {
  const musicians1 = track1.assigned
  const musicians2 = track2.assigned

  const similarity = musicians1.filter((uuid) => musicians2.includes(uuid))

  return similarity.length
}

function sortTracks(tracks) {
  const sortedTracks = [...tracks]

  for (let i = 0; i < sortedTracks.length - 1; i++) {
    let maxSimilarity = 0
    let mostSimilarIndex = i

    for (let j = i + 1; j < sortedTracks.length; j++) {
      const similarity = compareMusicians(sortedTracks[i], sortedTracks[j])
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity
        mostSimilarIndex = j
      }
    }

    if (mostSimilarIndex !== i) {
      const temp = sortedTracks[i + 1]
      sortedTracks[i + 1] = sortedTracks[mostSimilarIndex]
      sortedTracks[mostSimilarIndex] = temp
    }
  }

  sortedTracks.forEach((track, index) => {
    const nextTrack = sortedTracks[index + 1]
    if (nextTrack) {
      const similarity = compareMusicians(track, nextTrack)
      track.similarityWithNext = similarity
    }
  })

  return sortedTracks
}

export default sortTracks
