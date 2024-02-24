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

function rejectedMusicians(track) {
  return track.selected.filter((m) => !track.assigned.includes(m))
}

const makeDoc = async (tracks, stats, musicians) => {
  var content = []
  var tableRows = []

  tracks.forEach((track, index) => {
    content.push(
      new Paragraph({
        children: [
          new TextRun(`${index + 1}) `),
          new TextRun({ text: `« ${track.name} »`, bold: true }),
          new TextRun(` (${track.max} Musiciens)`)
        ],
        style: 'track'
      })
    )

    if (track.similarityWithNext) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Il y a ${track.assigned.length} musiciens qui jouent ce morceau${
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
            text: `Musiciens : ${track.assigned
              .map(
                (m) =>
                  `${musicians.find((musician) => musician[0] === m)[1]} ${
                    musicians.find((musician) => musician[0] === m)[2]
                  }`
              )
              .join(', ')}`
          }),
          new TextRun({ break: 1 })
        ]
      })
    )

    if (rejectedMusicians(track).length > 0) {
      content.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Musiciens rejetés : ${rejectedMusicians(track)
                .map(
                  (m) =>
                    `${musicians.find((musician) => musician[0] === m)[1]} ${
                      musicians.find((musician) => musician[0] === m)[2]
                    }`
                )
                .join(', ')}`
            }),
            new TextRun({ break: 1 })
          ]
        })
      )
    }
  })

  stats.forEach((stat) => {
    tableRows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph(musicians.find((m) => m[0] === stat[0])[1])]
          }),
          new TableCell({
            children: [new Paragraph(musicians.find((m) => m[0] === stat[0])[2])]
          }),
          new TableCell({
            children: [new Paragraph(String(stat[2]))]
          }),
          new TableCell({
            children: [new Paragraph(String(stat[1]))]
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
          })
        ]
      }),
      ...tableRows
    ]
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
