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

const makeDoc = async (tracks, tracksInfo, musicians) => {
  var content = []
  var tableRows = []

  tracks.forEach((track, index) => {
    content.push(
      new Paragraph({
        children: [
          new TextRun(`${index + 1}) `),
          new TextRun({ text: `« ${track.trackDetails.name} »`, bold: true }),
          new TextRun(` (${track.trackDetails.maxMusicians} Musiciens)`)
        ],
        style: 'track'
      })
    )

    if (track.similarityWithNext) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Il y a ${track.assignedMusicians.length} musiciens qui jouent ce morceau${
                track.similarityWithNext != null
                  ? `et ${track.similarityWithNext} musiciens en commun avec le morceau suivant.`
                  : '.'
              }`,
              italics: true
            }),
            new TextRun({ break: 1 })
          ]
        })
      )
    } else {
      content.push(
        new Paragraph({
          children: [new TextRun('')]
        })
      )
    }

    content.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `Musiciens : ${track.assignedMusicians
              .map((m) => `${m.musician.firstname} ${m.musician.lastname}`)
              .join(', ')}`
          }),
          new TextRun({ break: 1 })
        ]
      })
    )

    if (track.rejectedMusicians.length > 0) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Musiciens rejetés : ${track.rejectedMusicians
                .map((m) => `${m.firstname} ${m.lastname}`)
                .join(', ')}`
            }),
            new TextRun({ break: 1 })
          ]
        })
      )
    }
  })

  Object.entries(tracksInfo).forEach((trackInfo) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(musicians.find((m) => m.uuid === trackInfo[0]).firstname)]
          }),
          new TableCell({
            children: [new Paragraph(musicians.find((m) => m.uuid === trackInfo[0]).lastname)]
          }),
          new TableCell({
            children: [new Paragraph(String(trackInfo[1].played))]
          }),
          new TableCell({
            children: [new Paragraph(String(trackInfo[1].initial))]
          })
          /*new TableCell({
            children: [new Paragraph(String(trackInfo[1].chosen))]
          })*/
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
    children: [new TextRun({ text: 'Informations sur les musiciens' })],
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
            children: [new Paragraph('Nb morceaux joués')]
          }),
          new TableCell({
            children: [new Paragraph('Nb morceaux choisis')]
          }) /*
          new TableCell({
            children: [new Paragraph('Morceaux choisis et joués')]
          })*/
        ]
      }),
      ...tableRows
    ]
  })

  /*const legend = new Paragraph({
    children: [
      new TextRun({ text: '(*) Personnes ayant sélectionné le morceau dans le logiciel' })
    ],
    style: 'legend',
    alignment: AlignmentType.RIGHT
  })*/

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
        children: [title, space, ...content, space, space /*legend*/]
      },
      {
        properties: {},
        children: [infos, space, table]
      }
    ]
  })

  const buffer = await Packer.toBuffer(doc)

  return buffer
}

export default makeDoc
