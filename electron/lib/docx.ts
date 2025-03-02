import {
    AlignmentType,
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table,
    WidthType,
    TableRow,
    TableCell
} from 'docx'
import moment from 'moment'

/**
 * Retrieves the full name of a musician by their UUID.
 *
 * This function searches through an array of musicians
 * to find a musician with the specified UUID.
 * If both the name and surname are available, it returns
 * them concatenated. If only one is available, it returns
 * that with '???' for the missing part. If neither is available,
 * it returns 'Musicien inconnu'.
 *
 * @param uuid - The unique identifier of the musician to find.
 * @param musicians - An array of Musician objects to search through.
 * @returns The full name of the musician, a partial name with '???',
 *          or 'Musicien inconnu' if the musician is not found.
 */
function getMusicianName(uuid: string, musicians: Musician[]) {
    const musicianData = musicians.find((m) => m.uuid === uuid)

    if (musicianData?.name && musicianData?.surname) {
        return `${musicianData.name} ${musicianData.surname}`
    } else if (musicianData?.name) {
        return `${musicianData.name} ???`
    } else if (musicianData?.surname) {
        return `??? ${musicianData.surname}`
    } else {
        return 'Musicien inconnu'
    }
}

export async function makeDoc(data: {
    tracks: Track[]
    musicians: Musician[]
    distribution: DistributionItem[]
    stats: Stats
}) {
    var content: Paragraph[] = []
    var tableRows: TableRow[] = []

    const { tracks, musicians, distribution, stats } = data

    distribution.forEach((dist, index) => {
        content.push(
            new Paragraph({
                children: [
                    new TextRun(`${index + 1}) `),
                    new TextRun({
                        text:
                            tracks.find((track) => track.uuid === dist.trackUUID)?.name ||
                            'Morceau inconnu',
                        bold: true
                    }),
                    new TextRun(
                        ` (${tracks.find((track) => track.uuid === dist.trackUUID)?.maxMusicians || 0} Musiciens)`
                    )
                ],
                style: 'track'
            })
        )
        content.push(
            new Paragraph({
                children: [
                    new TextRun({
                        text: `Il y a ${dist.assignedMusiciansUUID.length} musicien${
                            dist.assignedMusiciansUUID.length > 1 ? 's' : ''
                        } qui joue${dist.assignedMusiciansUUID.length > 1 ? 'nt' : ''} sur ce morceau${
                            index + 1 == distribution.length
                                ? ''
                                : dist.musiciansInCommonWithNextTrack
                                  ? ` et ${dist.musiciansInCommonWithNextTrack.length} musicien${dist.musiciansInCommonWithNextTrack.length > 1 ? 's' : ''} en commun avec le morceau suivant`
                                  : ''
                        }.`,
                        italics: true
                    }),
                    new TextRun({ break: 1 })
                ]
            })
        )

        if (dist.assignedMusiciansUUID.length > 0) {
            content.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Musiciens assignés : ', bold: true }),
                        new TextRun({
                            text: dist.assignedMusiciansUUID
                                .map((musician) => getMusicianName(musician, musicians))
                                .join(', ')
                        }),
                        new TextRun({ break: 1 })
                    ]
                })
            )
        }

        if (dist.rejectedMusiciansUUID.length > 0) {
            content.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: 'Musiciens rejetés : ', bold: true }),
                        new TextRun({
                            text: dist.rejectedMusiciansUUID
                                .map((musician) => getMusicianName(musician, musicians))
                                .join(', ')
                        }),
                        new TextRun({ break: 1 })
                    ]
                })
            )
        }
    })

    stats.musicians
        .filter((musician) => musician.totalSelectedTracks > 0)
        .forEach((stat) => {
            tableRows.push(
                new TableRow({
                    children: [
                        new TableCell({
                            children: [
                                new Paragraph(
                                    musicians.find((musician) => musician.uuid == stat.uuid)
                                        ?.name || 'Musicien inconnu'
                                )
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(
                                    musicians.find((musician) => musician.uuid == stat.uuid)
                                        ?.surname || 'Musicien inconnu'
                                )
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(
                                    String(
                                        distribution.filter((track) =>
                                            track.assignedMusiciansUUID.includes(stat.uuid)
                                        ).length
                                    )
                                )
                            ]
                        }),
                        new TableCell({
                            children: [
                                new Paragraph(
                                    String(
                                        musicians.find((musician) => musician.uuid == stat.uuid)
                                            ?.selectedTracks.length || 0
                                    )
                                )
                            ]
                        })
                    ]
                })
            )
        })

    const title = new Paragraph({
        text: `Répartition des morceaux du ${moment().format('DD/MM/YYYY')}`,
        style: 'title',
        alignment: AlignmentType.CENTER
    })

    const infos = new Paragraph({
        children: [new TextRun({ text: 'Répartition des musiciens' })],
        style: 'title',
        alignment: AlignmentType.CENTER
    })

    const table = new Table({
        width: {
            size: 100,
            type: WidthType.PERCENTAGE
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        children: [new Paragraph('Nom')]
                    }),
                    new TableCell({
                        children: [new Paragraph('Prénom')]
                    }),
                    new TableCell({
                        children: [new Paragraph('Morceaux joués')]
                    }),
                    new TableCell({
                        children: [new Paragraph('Morceaux sélectionnés')]
                    })
                ]
            }),
            ...tableRows
        ]
    })

    const nonAssigned = 
    new Paragraph({
        children: [new TextRun({ text: 'Musiciens avec aucune sélection' })],
        style: 'title',
        alignment: AlignmentType.CENTER
    })

    const nonAssignedContent = musicians
            .filter((musician) => musician.selectedTracks.length == 0)
            .map((musician) => {
                return new Paragraph({
                    children: [
                        new TextRun({
                            text: `${musician.name || '???'} ${musician.surname || '???'}`
                        })
                    ],
                    bullet: {
                        level: 0
                    },
                    style: 'normal'
                })
            })

    const space = new Paragraph({
        text: '',
        run: {
            size: 24
        }
    })

    // The first argument is an ID you use to apply the style to paragraphs
    // The second argument is a human-friendly name to show in the UI
    const doc = new Document({
        creator: 'Melodistrib',
        title: `Répartition des morceaux du ${moment().format('DD/MM/YYYY')}`,
        description:
            'Document généré avec Melodistrib.\nMelodistrib est un logiciel de répartition équitable de morceaux.',
        styles: {
            paragraphStyles: [
                {
                    id: 'title',
                    name: 'Titre',
                    basedOn: 'Normal',
                    quickFormat: true,
                    run: {
                        size: 40,
                        bold: true,
                        font: 'Arial'
                    }
                },
                {
                    id: 'track',
                    name: 'Titre du morceau',
                    basedOn: 'Normal',
                    quickFormat: true,
                    run: {
                        size: 30,
                        font: 'Arial'
                    }
                },
                {
                    id: 'legend',
                    name: 'Légende',
                    basedOn: 'Normal',
                    quickFormat: true,
                    run: {
                        size: 20,
                        font: 'Arial'
                    }
                },
                {
                    id: 'normal',
                    name: 'Normal',
                    basedOn: 'Normal',
                    quickFormat: true,
                    run: {
                        size: 24,
                        font: 'Arial'
                    }
                }
            ]
        },
        sections: [
            {
                properties: {},
                children: [title, space, ...content]
            },
            {
                properties: {},
                children: [infos, space, table]
            },
            ...(nonAssignedContent.length > 0 ? [{
                properties: {},
                children: [nonAssigned, space, ...nonAssignedContent]
            }] : [])
        ]
    })

    const buffer = await Packer.toBuffer(doc)

    return buffer
}
