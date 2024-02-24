const getTrackMusicians = (selections, uuid) => {
  let musicians = []

  selections.forEach((selection) => {
    if (selection.includes(uuid)) {
      musicians.push(selection[0])
    }
  })

  return musicians
}

const distributeTracks = (tracks, musicians, selections) => {
  var result = []
  var stats = []

  //get the number of tracks chosen by each musician
  selections.forEach((selection) => {
    stats.push([selection[0], selection.length - 1, 0])
  })

  stats.sort((uuid1, uuid2) => {
    const lastname1 = musicians.find((m) => m[0] === uuid1[0])[2]
    const lastname2 = musicians.find((m) => m[0] === uuid2[0])[2]
    return lastname1.localeCompare(lastname2)
  })

  tracks.forEach((track) => {
    //get musicians who selected the track
    const selected = getTrackMusicians(selections, track[0])
    //get the number of musicians will play the track
    const nbMusicians = selected.length > track[2] ? track[2] : selected.length

    //intilialize the track structure
    var trackStructure = {
      uuid: track[0],
      name: track[1],
      max: track[2],
      selected,
      assigned: []
    }

    //sort musicians who have selected the track by selection
    trackStructure.selected.sort((a, b) => {
      if (
        stats.filter((stat) => stat[0] === a)[0][1] < stats.filter((stat) => stat[0] === b)[0][1]
      ) {
        //first
        return -1
      }
      if (
        stats.filter((stat) => stat[0] === a)[0][1] > stats.filter((stat) => stat[0] === b)[0][1]
      ) {
        //last
        return 1
      }
      //equal
      return 0
    })

    //distribute the track
    //create an array of length of musician
    Array.from({ length: nbMusicians }).forEach((data, index) => {
      trackStructure.assigned.push(trackStructure.selected[index])
      stats.filter((stat) => stat[0] === trackStructure.selected[index])[0][2] += 1
    })

    //sort the musicians who are assigned to the song alphabetically by lastname using musicians variable
    trackStructure.assigned.sort((uuid1, uuid2) => {
      const lastname1 = musicians.find((m) => m[0] === uuid1)[2]
      const lastname2 = musicians.find((m) => m[0] === uuid2)[2]
      return lastname1.localeCompare(lastname2)
    })

    trackStructure.selected.sort((uuid1, uuid2) => {
      const lastname1 = musicians.find((m) => m[0] === uuid1)[2]
      const lastname2 = musicians.find((m) => m[0] === uuid2)[2]
      return lastname1.localeCompare(lastname2)
    })

    result.push(trackStructure)
  })

  return { result, stats }
}

export default distributeTracks
