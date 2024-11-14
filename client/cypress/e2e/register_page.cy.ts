describe("The Register Page", () => {
  const uniqueEmail = `cypress_test_${Date.now()}@gmail.com`;

  it("successfully create user cypresstest", function () {
    cy.visit("/signup");

    cy.get("input[name=email]").type(uniqueEmail);
    cy.get("input[name=create-password]").type("somepassword");
    cy.get("input[name=confirm-password]").type("somepassword{enter}");

    cy.url().should("contain", "/");

    cy.wait(1000);
    cy.getCookie("token").should("exist");

    cy.contains("login").should("not.exist");
  });

  it("failed to create user cypresstest that already exists", function () {
    cy.visit("/signup");

    cy.get("input[name=email]").type(uniqueEmail);
    cy.get("input[name=create-password]").type("somepassword");
    cy.get("input[name=confirm-password]").type("somepassword{enter}");

    cy.contains("The provided email is already taken").should("be.visible");

    cy.url().should("contain", "/signup");
  });

  it("failed to create user cypresstest that password not matchs exists", function () {
    cy.visit("/signup");

    cy.get("input[name=email]").type("new_cypress@email.com");
    cy.get("input[name=create-password]").type("somepassword");
    cy.get("input[name=confirm-password]").type("anotherpassword{enter}");

    cy.contains("Fail to register password does not matched").should(
      "be.visible",
    );

    cy.url().should("contain", "/signup");
  });

  it("should redirect to login page", () => {
    cy.visit("/signup");

    cy.contains(/login/i).click();

    cy.url().should("equal", "/signin");
  });
});
