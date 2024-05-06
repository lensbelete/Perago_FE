const projects = [
  {
    id: 1,
    name: "Perago",
    description: "",
    tables  : [
      { id:2,
        description: "",
        name: "user",
        columns: []
      },

      { id:6,
        description: "",
        name: "admin",
        columns: [
          {
            id : 10,
            name: "name",
            type: "string",
            default_value: "",
            is_primarykey : false
          },
          {
            id : 12,
            name: "status",
            type: "number",
            default_value: "12",
            is_primarykey : false
          },
          {
            id : 30,
            name: "leave",
            type: "",
            default_value: "",
            is_primarykey : false
          },
         

        ]
      },

    ]
  },



  {
    id: 3,
    name: "AAU",
    description: "",
    tables  : [
      { id:4,
        description: "",
        name: "user",
        columns: []
      },
    ]
  },

  
  {
    id: 5,
    name: "AAU",
    description: "",
    tables  : [
      { id:6,
        description: "",
        name: "user",
        columns: []
      },
    ]
  },

]

export default projects