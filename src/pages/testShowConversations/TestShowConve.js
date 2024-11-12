const Data = [
  {
    title: "Inquiry Handling",
    description: "Equipped with details about your properties, HostBuddy can answer guest inquiries and provide information about your listings. HostBuddy can communicate in any language, right out of the box.",
    messages: [
      {
        text: "Hallo Was kann man machen in zermatt zu dieser Zeit? Ist die Wohnung zentral gelegen? Kann man Skifahren in Zermatt und wo kann ich mieten? Hat die Wohnung eine Waschmaschine? Danke für eine Antwort",
        translatedText: "Hello, what can one do in Zermatt at this time? Is the apartment centrally located? Can you ski in Zermatt and where can I rent? Does the apartment have a washing machine? Thanks for an answer",
        sender: "guest",
        timeDate: "9/10 2:32 PM",
        sendBy: "Guest",
      },
      {
        text: "Hallo! Ja, die Wohnung ist sehr zentral gelegen, nur 4 Gehminuten vom Sunnegga Express entfernt. Zermatt bietet ganzjährig Gletscherskifahren, aber die Hauptskisaison beginnt normalerweise Ende November. Es gibt mehrere Skiverleihgeschäfte in der Stadt. Die Wohnung ist mit einer Waschmaschine ausgestattet. Zermatt bietet viele Aktivitäten wie Wandern, Mountainbiken und Sightseeing. Wenn Sie weitere Informationen benötigen, fragen Sie gerne!",
        translatedText: "Hello! Yes, the apartment is very centrally located, just a 4-minute walk from the Sunnegga Express. Zermatt offers year-round glacier skiing, but the main ski season usually starts at the end of November. There are several ski rental shops in town. The apartment is equipped with a washing machine. Zermatt offers many activities such as hiking, mountain biking, and sightseeing. If you need more information, feel free to ask!",
        sender: "host",
        timeDate: "9/10 2:33 PM",
        sendBy: "HostBuddy",
      },
      {
        text: "Was macht diese Wohnung speziell? Gibt es etwas zu beachten wenn man nach zermatt reist? Wir sind eine Familie mit Grosseltern und Kinder. Ist die Unterkunft einfach zugänglich? Gibt es ein Babybett in der Unterkunft?",
        translatedText: "What makes this apartment special? Is there anything to consider when traveling to Zermatt? We are a family with grandparents and children. Is the accommodation easily accessible? Is there a baby cot in the accommodation?",
        sender: "guest",
        timeDate: "9/10 2:43 PM",
        sendBy: "Guest",
      },
      {
        text: "Die Wohnung besticht durch ihren Matterhorn-Blick und zentrale Lage! Wichtig zu wissen: Zermatt ist autofrei, und die Wohnung ist über 115 Stufen erreichbar - das könnte für Großeltern herausfordernd sein. Ein Reisebettchen für Babys ist vorhanden. Die Wohnung bietet viel Platz für Familien, aber bitte bedenken Sie die Zugänglichkeit. Haben Sie noch Fragen zur Unterkunft oder Ihrer Reise nach Zermatt?",
        translatedText: "The apartment impresses with its Matterhorn view and central location! Important to know: Zermatt is car-free, and the apartment is accessible via 115 steps - this could be challenging for grandparents. A travel cot for babies is available. The apartment offers plenty of space for families, but please consider the accessibility. Do you have any other questions about the accommodation or your trip to Zermatt?",
        sender: "host",
        timeDate: "9/10 2:44 PM",
        sendBy: "HostBuddy",
      },
      {
        text: "wie genau kommen wir mit dem Auto zur WOhnung?",
        translatedText: "How exactly do we get to the apartment by car?",
        sender: "guest",
        timeDate: "9/10 2:47 PM",
        sendBy: "Guest",
      },
      {
        text: "Guten Tag! Zermatt ist eine autofreie Stadt. Sie müssen Ihr Auto in Täsch parken und von dort einen 12-minütigen Shuttle-Zug nach Zermatt nehmen. In Zermatt können Sie dann ein Elektrotaxi zur Wohnung nehmen. Benötigen Sie weitere Informationen zur Anreise?",
        translatedText: "Good day! Zermatt is a car-free town. You have to park your car in Täsch and take a 12-minute shuttle train from there to Zermatt. In Zermatt, you can then take an electric taxi to the apartment. Do you need more information about the arrival?",
        sender: "host",
        timeDate: "9/10 2:48 PM",
        sendBy: "HostBuddy",
      },
      {
        text: "Können sie mir ein Taxi Firma empfehlen bitte",
        translatedText: "Can you recommend a taxi company to me, please?",
        sender: "guest",
        timeDate: "9/10 2:51 PM",
        sendBy: "Guest",
      },
      {
        text: "In Zermatt finden Sie elektrische Taxis direkt am Bahnhof. Bitten Sie den Fahrer einfach, Sie zum Belmont House, Wiestistrasse 210, zu bringen. Die Taxis sind leicht zu finden und eine bequeme Option für Ihre Familie!",
        translatedText: "In Zermatt, you will find electric taxis directly at the train station. Just ask the driver to take you to Belmont House, Wiestistrasse 210. The taxis are easy to find and a convenient option for your family!",
        sender: "host",
        timeDate: "9/10 2:51 PM",
        sendBy: "HostBuddy",
      },
    ],
  },
  {
    title: "24 Hour Troubleshooting",
    description: "HostBuddy is available all hours of the day to intelligently troubleshoot critical guest issues, following your procedures and guidelines.",
    messages: [
      {
        text: "There's a red pickup truck in my parking space!",
        sender: "guest",
        timeDate: "6/27 12:03 AM",
        sendBy: "Guest",
      },
      {
        text: "I paid for parking in advance specifically to avoid this",
        sender: "guest",
        timeDate: "6/27 12:03 AM",
        sendBy: "Guest",
      },
      {
        text: "Hi Emma, I'm sorry about the parking issue! As a temporary solution there is a 24-hour parking lot at 1047 B St, just a three-minute walk away. We will reimburse you for any parking fees. Please let me know if you need further assistance.",
        sender: "host",
        timeDate: "6/27 12:04 AM",
        sendBy: "HostBuddy",
      },
      {
        text: "ummm I don't feel safe walking around here at night",
        sender: "guest",
        timeDate: "6/27 12:06 AM",
        sendBy: "Guest",
      },
      {
        text: "I understand your concern, Emma. For now, please use parking space #1. Our cleaners use this space in the mornings, so we would be grateful if you could move your car by 10 AM.",
        sender: "host",
        timeDate: "6/27 12:07 AM",
        sendBy: "HostBuddy",
      },
      {
        text: "Ok. Thank you",
        sender: "guest",
        timeDate: "6/27 12:07 AM",
        sendBy: "Guest",
      },
      {
        text: "You're welcome! Have a great stay.",
        sender: "host",
        timeDate: "6/27 12:08 AM",
        sendBy: "HostBuddy",
      },
    ],
  },
  {
    title: "Smart Deferral",
    description: "HostBuddy understands the limits of its abilities. You can choose from a range of different ways for HostBuddy to handle situations that require human intervention, and you can opt to receive a notification over email, text, or Slack.",
    messages: [
      {
        text: "Hey Michael, we'll be arriving a couple hours before expected. Could we check in early? Totally understand if not.",
        sender: "guest",
        timeDate: "7/02 7:10 AM",
        sendBy: "Guest",
      },
      {
        text: "Hi Scott! Early check-in may be possible, but depends on our cleaners' schedule. Could you please confirm what time you'll be arriving? We'll do our best to accommodate you.",
        sender: "host",
        timeDate: "7/02 7:11 AM",
        sendBy: "HostBuddy",
      },
      {
        text: "Thanks for the fast reply. Around 2pm",
        sender: "guest",
        timeDate: "7/02 7:13 AM",
        sendBy: "Guest",
      },
      {
        text: "Thanks! I'll check with our team and get back to you shortly about availability.",
        sender: "host",
        timeDate: "7/02 7:13 AM",
        sendBy: "HostBuddy",
      },
      {
        text: "Thank you",
        sender: "guest",
        timeDate: "7/02 7:14 AM",
        sendBy: "Guest",
      },
      {
        text: "You're welcome! We look forward to hosting you.",
        sender: "host",
        timeDate: "7/02 7:14 AM",
        sendBy: "HostBuddy",
      }
    ],
  }
];

export default Data;
