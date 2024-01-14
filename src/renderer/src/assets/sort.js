function compareMusicians(track1, track2) {
  // Cette fonction compare les musiciens attribués à deux pistes et retourne le nombre de musiciens communs.
  // Elle prend deux objets pistes (track1 et track2) en argument.

  // Extraction des UUID des musiciens attribués à chaque piste
  const musicians1 = track1.assignedMusicians.map((m) => m.musician.uuid)
  const musicians2 = track2.assignedMusicians.map((m) => m.musician.uuid)

  // Filtrer les UUID communs aux deux pistes
  const similarity = musicians1.filter((uuid) => musicians2.includes(uuid))

  // Retourner le nombre de musiciens communs
  return similarity.length
}

function sortTracks(tracks) {
  // Cette fonction trie un ensemble de pistes en fonction de la similarité des musiciens qui y sont attribués.
  // Elle prend un objet contenant des pistes en argument.

  // Conversion des pistes en tableau
  const sortedTracks = Object.values(tracks || {})

  // Algorithme de tri des pistes
  for (let i = 0; i < sortedTracks.length - 1; i++) {
    let maxSimilarity = 0
    let mostSimilarIndex = i

    // Comparaison des pistes pour trouver la plus similaire
    for (let j = i + 1; j < sortedTracks.length; j++) {
      const similarity = compareMusicians(sortedTracks[i], sortedTracks[j])
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity
        mostSimilarIndex = j
      }
    }

    // Échange des positions des pistes pour mettre la plus similaire à la suite de la piste actuelle
    if (mostSimilarIndex !== i) {
      const temp = sortedTracks[i + 1]
      sortedTracks[i + 1] = sortedTracks[mostSimilarIndex]
      sortedTracks[mostSimilarIndex] = temp
    }
  }

  // Calcul de la similarité avec la piste suivante pour chaque piste triée et ajout de l'id
  sortedTracks.forEach((track, index) => {
    const nextTrack = sortedTracks[index + 1]
    if (nextTrack) {
      const similarity = compareMusicians(track, nextTrack)
      track.similarityWithNext = similarity
    }
  })

  // Retourner les pistes triées
  return sortedTracks
}

export default sortTracks
