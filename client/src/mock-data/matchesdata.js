const matches = [
   {
      id: "67b6d770-b0bf-45f7-8e82-5461eda8df7b",
      username: "walking_evergreen",
      birthdate: "03241984",
      age: "36",
      score: 62,
      createdAt: 1603342688819,
      verifyPhotoUrl:
         "https://static.wixstatic.com/media/7fa9fc_1b0170005fea4ea5b66760afedee15c4~mv2.jpg/v1/fill/w_1000,h_665,al_c,q_85/7fa9fc_1b0170005fea4ea5b66760afedee15c4~mv2.jpg", // use the actual URL for the photos you found!
      questions: [
         {
            id: "a2dfe856-c8bc-44c8-be7b-a38e2c3329d9",
            title: "Would you like to have any/additional kids in the future?",
            type: 1,
            limit: 1,
            answers: [
               {
                  id: "511b443a-59a0-4e0b-a408-e75244fa2486",
                  text: "Yes",
               },
               {
                  id: "becf4d45-4ddf-44c1-9ea5-22538f0ac948",
                  text: "No",
               },
               {
                  id: "0592557f-d0c1-4013-a1a8-4c888a73a477",
                  text: "Maybe",
               },
            ],
            selectedAnswerIds: ["511b443a-59a0-4e0b-a408-e75244fa2486"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "3c8da21c-e09a-4085-8b49-db0cebb7bf7a",
            title: "How important is exercise or working out to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "53323386-fde9-4d54-9c13-a1ed359ffae4",
                  text: "Not at all important",
               },
               {
                  id: "d86f9fd5-3208-40fa-81c3-f541a426f52a",
                  text: "Not really important",
               },
               {
                  id: "8a566489-636b-47ac-9372-d0951d6b6dcb",
                  text: "Somewhat important",
               },
               {
                  id: "6e6e7314-0fb7-4275-9916-412af7feff41",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["8a566489-636b-47ac-9372-d0951d6b6dcb"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "e10023c2-472e-4003-a8c4-0e5fe2d0cf42",
            title:
               "How important is it for you to climb the ladder at your job and get promotions?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "c5a86aac-97da-4ceb-9c18-9337f82ad01b",
                  text: "Not at all important",
               },
               {
                  id: "a63de221-941f-4b43-a4a9-07a80f076176",
                  text: "Not really important",
               },
               {
                  id: "09feee2b-b4af-460e-862e-51bb62daa658",
                  text: "Somewhat important",
               },
               {
                  id: "ef92e6b3-31f2-41a8-bb38-a97b4170b83e",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["ef92e6b3-31f2-41a8-bb38-a97b4170b83e"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "0949f8f5-f84f-4df9-91ff-7260630c6eb9",
            title: "How important are your spiritual/religious beliefs to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "40c7b88f-185c-4acd-a9cf-6568823faf28",
                  text: "Not at all important",
               },
               {
                  id: "85f03a85-b079-4c32-b478-c22c1ef975d0",
                  text: "Not really important",
               },
               {
                  id: "f44a0f87-ba5e-4b2b-9478-280c808b29ea",
                  text: "Somewhat important",
               },
               {
                  id: "157f8c1c-456f-4fbd-ae17-3eb8e6692995",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["40c7b88f-185c-4acd-a9cf-6568823faf28"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "fc386d71-8ef0-4661-894b-c193b3b5da44",
            title:
               "Which political topics are most important to you? (Choose 2)",
            type: 2,
            limit: 2,
            answers: [
               {
                  id: "7698f367-8aa0-4c62-9970-0115f359111e",
                  text: "Racial injustice",
               },
               {
                  id: "7b7ca131-4d07-452d-a174-559259cd4b9d",
                  text: "Health care",
               },
               {
                  id: "ab27e852-60e1-4ac7-9b62-b4e5b432ae75",
                  text: "Illegal immigration",
               },
               {
                  id: "5073c312-508b-4af2-94f9-3462b70d7052",
                  text: "Climate change",
               },
               {
                  id: "3408bb6f-6c9e-4e2e-8ef9-d5943ff7d459",
                  text: "National security",
               },
               {
                  id: "b796896a-6f84-4dba-9d04-e8ecf0f3b122",
                  text: "Gun rights",
               },
            ],
            selectedAnswerIds: [
               "5073c312-508b-4af2-94f9-3462b70d7052",
               "7698f367-8aa0-4c62-9970-0115f359111e",
            ], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "d479c412-0db9-42af-9702-308d5c016107",
            title: "Which religious beliefs are closest to your own?",
            type: 2,
            limit: 0,
            answers: [
               {
                  id: "979b9b27-f3d9-47df-93e2-2edb4057258a",
                  text: "Atheist",
               },
               {
                  id: "a86acabe-68ce-455d-9657-bdd05e2d1d77",
                  text: "Spiritual but not religious",
               },
               {
                  id: "c6755709-4844-4919-aec8-4748c223d7df",
                  text: "Agnostic",
               },
               {
                  id: "0c14060d-3b17-4c30-9501-18b833e0bda9",
                  text: "Catholic",
               },
               {
                  id: "4db711e1-0db8-4aad-9ce4-b5a06bec532e",
                  text: "Christian / Protestant",
               },
               {
                  id: "8c375574-4af3-4f3e-9068-fdbd5c000cc9",
                  text: "Buddhist / Taoist",
               },
               {
                  id: "e47ae986-93c3-43f2-b934-481424ef4405",
                  text: "Hindu",
               },
               {
                  id: "036ae449-ced1-41dc-a264-bc471347d996",
                  text: "Muslim / Islam",
               },
               {
                  id: "81b6b145-065c-4d48-984c-12fe52e08ecb",
                  text: "Other",
               },
            ],
            selectedAnswerIds: ["a86acabe-68ce-455d-9657-bdd05e2d1d77"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
      ],
   },
   {
      id: "87b6d770-b0bf-45f7-8e82-5461eda8df7b",
      username: "running_maple",
      birthdate: "02151987",
      age: "33",
      score: 89,
      createdAt: 1603342688819,
      verifyPhotoUrl:
         "http://clipart-library.com/new_gallery/45-455875_black-person-png-business-professional-man-png.png", // use the actual URL for the photos you found!
      questions: [
         {
            id: "a2dfe856-c8bc-44c8-be7b-a38e2c3329d9",
            title: "Would you like to have any/additional kids in the future?",
            type: 1,
            limit: 1,
            answers: [
               {
                  id: "511b443a-59a0-4e0b-a408-e75244fa2486",
                  text: "Yes",
               },
               {
                  id: "becf4d45-4ddf-44c1-9ea5-22538f0ac948",
                  text: "No",
               },
               {
                  id: "0592557f-d0c1-4013-a1a8-4c888a73a477",
                  text: "Maybe",
               },
            ],
            selectedAnswerIds: ["becf4d45-4ddf-44c1-9ea5-22538f0ac948"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "3c8da21c-e09a-4085-8b49-db0cebb7bf7a",
            title: "How important is exercise or working out to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "53323386-fde9-4d54-9c13-a1ed359ffae4",
                  text: "Not at all important",
               },
               {
                  id: "d86f9fd5-3208-40fa-81c3-f541a426f52a",
                  text: "Not really important",
               },
               {
                  id: "8a566489-636b-47ac-9372-d0951d6b6dcb",
                  text: "Somewhat important",
               },
               {
                  id: "6e6e7314-0fb7-4275-9916-412af7feff41",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["d86f9fd5-3208-40fa-81c3-f541a426f52a"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "e10023c2-472e-4003-a8c4-0e5fe2d0cf42",
            title:
               "How important is it for you to climb the ladder at your job and get promotions?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "c5a86aac-97da-4ceb-9c18-9337f82ad01b",
                  text: "Not at all important",
               },
               {
                  id: "a63de221-941f-4b43-a4a9-07a80f076176",
                  text: "Not really important",
               },
               {
                  id: "09feee2b-b4af-460e-862e-51bb62daa658",
                  text: "Somewhat important",
               },
               {
                  id: "ef92e6b3-31f2-41a8-bb38-a97b4170b83e",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["a63de221-941f-4b43-a4a9-07a80f076176"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "0949f8f5-f84f-4df9-91ff-7260630c6eb9",
            title: "How important are your spiritual/religious beliefs to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "40c7b88f-185c-4acd-a9cf-6568823faf28",
                  text: "Not at all important",
               },
               {
                  id: "85f03a85-b079-4c32-b478-c22c1ef975d0",
                  text: "Not really important",
               },
               {
                  id: "f44a0f87-ba5e-4b2b-9478-280c808b29ea",
                  text: "Somewhat important",
               },
               {
                  id: "157f8c1c-456f-4fbd-ae17-3eb8e6692995",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["85f03a85-b079-4c32-b478-c22c1ef975d0"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "fc386d71-8ef0-4661-894b-c193b3b5da44",
            title: "Which political topics are most important to you?",
            subtitle: "(Choose 2)",
            type: 2,
            limit: 2,
            answers: [
               {
                  id: "7698f367-8aa0-4c62-9970-0115f359111e",
                  text: "Racial injustice",
               },
               {
                  id: "7b7ca131-4d07-452d-a174-559259cd4b9d",
                  text: "Health care",
               },
               {
                  id: "ab27e852-60e1-4ac7-9b62-b4e5b432ae75",
                  text: "Illegal immigration",
               },
               {
                  id: "5073c312-508b-4af2-94f9-3462b70d7052",
                  text: "Climate change",
               },
               {
                  id: "3408bb6f-6c9e-4e2e-8ef9-d5943ff7d459",
                  text: "National security",
               },
               {
                  id: "b796896a-6f84-4dba-9d04-e8ecf0f3b122",
                  text: "Gun rights",
               },
            ],
            selectedAnswerIds: [
               "7698f367-8aa0-4c62-9970-0115f359111e",
               "7b7ca131-4d07-452d-a174-559259cd4b9d",
            ], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "d479c412-0db9-42af-9702-308d5c016107",
            title: "Which religious beliefs are closest to your own?",
            type: 2,
            limit: 0,
            answers: [
               {
                  id: "979b9b27-f3d9-47df-93e2-2edb4057258a",
                  text: "Atheist",
               },
               {
                  id: "a86acabe-68ce-455d-9657-bdd05e2d1d77",
                  text: "Spiritual but not religious",
               },
               {
                  id: "c6755709-4844-4919-aec8-4748c223d7df",
                  text: "Agnostic",
               },
               {
                  id: "0c14060d-3b17-4c30-9501-18b833e0bda9",
                  text: "Catholic",
               },
               {
                  id: "4db711e1-0db8-4aad-9ce4-b5a06bec532e",
                  text: "Christian / Protestant",
               },
               {
                  id: "8c375574-4af3-4f3e-9068-fdbd5c000cc9",
                  text: "Buddhist / Taoist",
               },
               {
                  id: "e47ae986-93c3-43f2-b934-481424ef4405",
                  text: "Hindu",
               },
               {
                  id: "036ae449-ced1-41dc-a264-bc471347d996",
                  text: "Muslim / Islam",
               },
               {
                  id: "81b6b145-065c-4d48-984c-12fe52e08ecb",
                  text: "Other",
               },
            ],
            selectedAnswerIds: ["c6755709-4844-4919-aec8-4748c223d7df"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
      ],
   },
   {
      id: "77b6d770-b0bf-45f7-8e82-5461eda8df7b",
      username: "jumping_fir",
      birthdate: "11041989",
      age: "30",
      score: 37,
      createdAt: 1603342688819,
      verifyPhotoUrl:
         "https://images.squarespace-cdn.com/content/v1/592702373a04114633ee6536/1528567192195-VCIU199PUKZ1WYYVUXLF/ke17ZwdGBToddI8pDm48kJ8m9hRK-_ZTTw3hGANm0fYUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8GRo6ASst2s6pLvNAu_PZdJOX8AtFkTRSQSF4gXjSOXyTHLl8NHV1q-G-Yn2mJ25w2PkeSciNTH41AkCYSdUaPY/Corporate-Headshots-Casual-Attire", // use the actual URL for the photos you found!
      questions: [
         {
            id: "a2dfe856-c8bc-44c8-be7b-a38e2c3329d9",
            title: "Would you like to have any/additional kids in the future?",
            type: 1,
            limit: 1,
            answers: [
               {
                  id: "511b443a-59a0-4e0b-a408-e75244fa2486",
                  text: "Yes",
               },
               {
                  id: "becf4d45-4ddf-44c1-9ea5-22538f0ac948",
                  text: "No",
               },
               {
                  id: "0592557f-d0c1-4013-a1a8-4c888a73a477",
                  text: "Maybe",
               },
            ],
            selectedAnswerIds: ["0592557f-d0c1-4013-a1a8-4c888a73a477"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "3c8da21c-e09a-4085-8b49-db0cebb7bf7a",
            title: "How important is exercise or working out to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "53323386-fde9-4d54-9c13-a1ed359ffae4",
                  text: "Not at all important",
               },
               {
                  id: "d86f9fd5-3208-40fa-81c3-f541a426f52a",
                  text: "Not really important",
               },
               {
                  id: "8a566489-636b-47ac-9372-d0951d6b6dcb",
                  text: "Somewhat important",
               },
               {
                  id: "6e6e7314-0fb7-4275-9916-412af7feff41",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["8a566489-636b-47ac-9372-d0951d6b6dcb"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "e10023c2-472e-4003-a8c4-0e5fe2d0cf42",
            title:
               "How important is it for you to climb the ladder at your job and get promotions?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "c5a86aac-97da-4ceb-9c18-9337f82ad01b",
                  text: "Not at all important",
               },
               {
                  id: "a63de221-941f-4b43-a4a9-07a80f076176",
                  text: "Not really important",
               },
               {
                  id: "09feee2b-b4af-460e-862e-51bb62daa658",
                  text: "Somewhat important",
               },
               {
                  id: "ef92e6b3-31f2-41a8-bb38-a97b4170b83e",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["a63de221-941f-4b43-a4a9-07a80f076176"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "0949f8f5-f84f-4df9-91ff-7260630c6eb9",
            title: "How important are your spiritual/religious beliefs to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "40c7b88f-185c-4acd-a9cf-6568823faf28",
                  text: "Not at all important",
               },
               {
                  id: "85f03a85-b079-4c32-b478-c22c1ef975d0",
                  text: "Not really important",
               },
               {
                  id: "f44a0f87-ba5e-4b2b-9478-280c808b29ea",
                  text: "Somewhat important",
               },
               {
                  id: "157f8c1c-456f-4fbd-ae17-3eb8e6692995",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["157f8c1c-456f-4fbd-ae17-3eb8e6692995"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "fc386d71-8ef0-4661-894b-c193b3b5da44",
            title: "Which political topics are most important to you?",
            subtitle: "(Choose 2)",
            type: 2,
            limit: 2,
            answers: [
               {
                  id: "7698f367-8aa0-4c62-9970-0115f359111e",
                  text: "Racial injustice",
               },
               {
                  id: "7b7ca131-4d07-452d-a174-559259cd4b9d",
                  text: "Health care",
               },
               {
                  id: "ab27e852-60e1-4ac7-9b62-b4e5b432ae75",
                  text: "Illegal immigration",
               },
               {
                  id: "5073c312-508b-4af2-94f9-3462b70d7052",
                  text: "Climate change",
               },
               {
                  id: "3408bb6f-6c9e-4e2e-8ef9-d5943ff7d459",
                  text: "National security",
               },
               {
                  id: "b796896a-6f84-4dba-9d04-e8ecf0f3b122",
                  text: "Gun rights",
               },
            ],
            selectedAnswerIds: [
               "3408bb6f-6c9e-4e2e-8ef9-d5943ff7d459",
               "b796896a-6f84-4dba-9d04-e8ecf0f3b122",
            ], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "d479c412-0db9-42af-9702-308d5c016107",
            title: "Which religious beliefs are closest to your own?",
            type: 2,
            limit: 0,
            answers: [
               {
                  id: "979b9b27-f3d9-47df-93e2-2edb4057258a",
                  text: "Atheist",
               },
               {
                  id: "a86acabe-68ce-455d-9657-bdd05e2d1d77",
                  text: "Spiritual but not religious",
               },
               {
                  id: "c6755709-4844-4919-aec8-4748c223d7df",
                  text: "Agnostic",
               },
               {
                  id: "0c14060d-3b17-4c30-9501-18b833e0bda9",
                  text: "Catholic",
               },
               {
                  id: "4db711e1-0db8-4aad-9ce4-b5a06bec532e",
                  text: "Christian / Protestant",
               },
               {
                  id: "8c375574-4af3-4f3e-9068-fdbd5c000cc9",
                  text: "Buddhist / Taoist",
               },
               {
                  id: "e47ae986-93c3-43f2-b934-481424ef4405",
                  text: "Hindu",
               },
               {
                  id: "036ae449-ced1-41dc-a264-bc471347d996",
                  text: "Muslim / Islam",
               },
               {
                  id: "81b6b145-065c-4d48-984c-12fe52e08ecb",
                  text: "Other",
               },
            ],
            selectedAnswerIds: ["4db711e1-0db8-4aad-9ce4-b5a06bec532e"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
      ],
   },
   {
      id: "97b6d770-b0bf-45f7-8e82-5461eda8df7b",
      username: "flying_cedar",
      birthdate: "06131992",
      age: "28",
      score: 74,
      createdAt: 1603342688819,
      verifyPhotoUrl:
         "https://zenstudiosla.com/wp-content/uploads/2020/08/Corporate-Headshot-man-1742-.jpg", // use the actual URL for the photos you found!
      questions: [
         {
            id: "a2dfe856-c8bc-44c8-be7b-a38e2c3329d9",
            title: "Would you like to have any/additional kids in the future?",
            type: 1,
            limit: 1,
            answers: [
               {
                  id: "511b443a-59a0-4e0b-a408-e75244fa2486",
                  text: "Yes",
               },
               {
                  id: "becf4d45-4ddf-44c1-9ea5-22538f0ac948",
                  text: "No",
               },
               {
                  id: "0592557f-d0c1-4013-a1a8-4c888a73a477",
                  text: "Maybe",
               },
            ],
            selectedAnswerIds: ["511b443a-59a0-4e0b-a408-e75244fa2486"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "3c8da21c-e09a-4085-8b49-db0cebb7bf7a",
            title: "How important is exercise or working out to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "53323386-fde9-4d54-9c13-a1ed359ffae4",
                  text: "Not at all important",
               },
               {
                  id: "d86f9fd5-3208-40fa-81c3-f541a426f52a",
                  text: "Not really important",
               },
               {
                  id: "8a566489-636b-47ac-9372-d0951d6b6dcb",
                  text: "Somewhat important",
               },
               {
                  id: "6e6e7314-0fb7-4275-9916-412af7feff41",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["d86f9fd5-3208-40fa-81c3-f541a426f52a"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "e10023c2-472e-4003-a8c4-0e5fe2d0cf42",
            title:
               "How important is it for you to climb the ladder at your job and get promotions?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "c5a86aac-97da-4ceb-9c18-9337f82ad01b",
                  text: "Not at all important",
               },
               {
                  id: "a63de221-941f-4b43-a4a9-07a80f076176",
                  text: "Not really important",
               },
               {
                  id: "09feee2b-b4af-460e-862e-51bb62daa658",
                  text: "Somewhat important",
               },
               {
                  id: "ef92e6b3-31f2-41a8-bb38-a97b4170b83e",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["09feee2b-b4af-460e-862e-51bb62daa658"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "0949f8f5-f84f-4df9-91ff-7260630c6eb9",
            title: "How important are your spiritual/religious beliefs to you?",
            type: 3,
            limit: 1,
            answers: [
               {
                  id: "40c7b88f-185c-4acd-a9cf-6568823faf28",
                  text: "Not at all important",
               },
               {
                  id: "85f03a85-b079-4c32-b478-c22c1ef975d0",
                  text: "Not really important",
               },
               {
                  id: "f44a0f87-ba5e-4b2b-9478-280c808b29ea",
                  text: "Somewhat important",
               },
               {
                  id: "157f8c1c-456f-4fbd-ae17-3eb8e6692995",
                  text: "Extremely important",
               },
            ],
            selectedAnswerIds: ["157f8c1c-456f-4fbd-ae17-3eb8e6692995"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "fc386d71-8ef0-4661-894b-c193b3b5da44",
            title: "Which political topics are most important to you?",
            subtitle: "(Choose 2)",
            type: 2,
            limit: 2,
            answers: [
               {
                  id: "7698f367-8aa0-4c62-9970-0115f359111e",
                  text: "Racial injustice",
               },
               {
                  id: "7b7ca131-4d07-452d-a174-559259cd4b9d",
                  text: "Health care",
               },
               {
                  id: "ab27e852-60e1-4ac7-9b62-b4e5b432ae75",
                  text: "Illegal immigration",
               },
               {
                  id: "5073c312-508b-4af2-94f9-3462b70d7052",
                  text: "Climate change",
               },
               {
                  id: "3408bb6f-6c9e-4e2e-8ef9-d5943ff7d459",
                  text: "National security",
               },
               {
                  id: "b796896a-6f84-4dba-9d04-e8ecf0f3b122",
                  text: "Gun rights",
               },
            ],
            selectedAnswerIds: [
               "7b7ca131-4d07-452d-a174-559259cd4b9d",
               "b796896a-6f84-4dba-9d04-e8ecf0f3b122",
            ], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
         {
            id: "d479c412-0db9-42af-9702-308d5c016107",
            title: "Which religious beliefs are closest to your own?",
            type: 2,
            limit: 0,
            answers: [
               {
                  id: "979b9b27-f3d9-47df-93e2-2edb4057258a",
                  text: "Atheist",
               },
               {
                  id: "a86acabe-68ce-455d-9657-bdd05e2d1d77",
                  text: "Spiritual but not religious",
               },
               {
                  id: "c6755709-4844-4919-aec8-4748c223d7df",
                  text: "Agnostic",
               },
               {
                  id: "0c14060d-3b17-4c30-9501-18b833e0bda9",
                  text: "Catholic",
               },
               {
                  id: "4db711e1-0db8-4aad-9ce4-b5a06bec532e",
                  text: "Christian / Protestant",
               },
               {
                  id: "8c375574-4af3-4f3e-9068-fdbd5c000cc9",
                  text: "Buddhist / Taoist",
               },
               {
                  id: "e47ae986-93c3-43f2-b934-481424ef4405",
                  text: "Hindu",
               },
               {
                  id: "036ae449-ced1-41dc-a264-bc471347d996",
                  text: "Muslim / Islam",
               },
               {
                  id: "81b6b145-065c-4d48-984c-12fe52e08ecb",
                  text: "Other",
               },
            ],
            selectedAnswerIds: ["4db711e1-0db8-4aad-9ce4-b5a06bec532e"], // an array of UUIDs indicating all selected answers. can be one or none, too.
         },
      ],
   },
];

export default matches;
