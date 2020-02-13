const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app.js");
const Company = require("../models/company.model.js");

describe("companies", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      };
      await mongoose.connect(mongoUri, mongoOptions);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  //seed company data on mock server
  beforeEach(async () => {
    const allCompaniesData = [
      {
        id: "e5cc2c0a-93b5-4014-8910-6ed9f3056456",
        companyName: "Brakus, Aufderhar and Gutkowski",
        companySuffix: "and Sons",
        numberOfEmployees: 60497,
        description:
          "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui.",
        reviews: [
          {
            id: "7da4d967-715b-4dc1-a74b-82a7992704f3",
            userId: "f6e016e6-e254-4375-bf82-797e6c00e3eb",
            userName: "Brennan Fisher",
            rating: 0,
            title: "eligendi adipisci",
            review:
              "Consequatur esse beatae voluptate voluptatibus expedita aperiam perspiciatis cumque voluptatem. Cum quasi dolor ut dignissimos illum magni eos. Et aspernatur illum commodi."
          },
          {
            id: "fa07ef47-5849-4642-8af0-640e4887b1e6",
            userId: "13d0782f-2793-4c83-8279-93c9a03b3ac3",
            userName: "Annalise Nicolas",
            rating: 4,
            title: "iusto consequatur",
            review:
              "Facere dicta delectus impedit sunt sed officia omnis. Officiis vel optio corrupti iure. Atque iusto nemo. Ut voluptas quaerat omnis quis impedit maiores nihil ipsam. Quod ea sed voluptates. Dolorem officia esse enim."
          }
        ]
      }
    ];

    await Company.create(allCompaniesData);
  });

  afterEach(async () => {
    jest.resetAllMocks();
    await Company.deleteMany();
  });

  describe("/", () => {
    it("1: GET / should return all companies' data with no reviews", async () => {
      const expectedCompanyData = [
        {
          id: "e5cc2c0a-93b5-4014-8910-6ed9f3056456",
          companyName: "Brakus, Aufderhar and Gutkowski",
          companySuffix: "and Sons",
          numberOfEmployees: 60497,
          description:
            "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui."
        }
      ];
      const { body: companyData } = await request(app)
        .get("/companies")
        .expect(200);
      expect(companyData).toMatchObject(expectedCompanyData);
    });

    describe("/:id", () => {
      it("GET / should return target company data including reviews", async () => {
        const expectedCompanyData = {
          id: "e5cc2c0a-93b5-4014-8910-6ed9f3056456",
          companyName: "Brakus, Aufderhar and Gutkowski",
          companySuffix: "and Sons",
          numberOfEmployees: 60497,
          description:
            "Voluptas reiciendis quasi expedita ex qui sit. Qui enim facilis adipisci qui.",
          reviews: [
            {
              id: "7da4d967-715b-4dc1-a74b-82a7992704f3",
              userId: "f6e016e6-e254-4375-bf82-797e6c00e3eb",
              userName: "Brennan Fisher",
              rating: 0,
              title: "eligendi adipisci",
              review:
                "Consequatur esse beatae voluptate voluptatibus expedita aperiam perspiciatis cumque voluptatem. Cum quasi dolor ut dignissimos illum magni eos. Et aspernatur illum commodi."
            },
            {
              id: "fa07ef47-5849-4642-8af0-640e4887b1e6",
              userId: "13d0782f-2793-4c83-8279-93c9a03b3ac3",
              userName: "Annalise Nicolas",
              rating: 4,
              title: "iusto consequatur",
              review:
                "Facere dicta delectus impedit sunt sed officia omnis. Officiis vel optio corrupti iure. Atque iusto nemo. Ut voluptas quaerat omnis quis impedit maiores nihil ipsam. Quod ea sed voluptates. Dolorem officia esse enim."
            }
          ]
        };
        const { body: targetCompanyData } = await request(app)
          .get(`/companies/${expectedCompanyData.id}`)
          .expect(200);
        expect(targetCompanyData).toMatchObject(expectedCompanyData);
      });
    });
  });
});
