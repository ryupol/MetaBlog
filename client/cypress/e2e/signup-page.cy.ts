describe("Signup Page", () => {
  const uniqueEmail = `cypress${Date.now()}@gmail.com`;
  const correctPassword = "123456";
  it("successfully create user", () => {
    cy.visit("/signup");

    cy.get("input[name=email]").type(uniqueEmail);

    cy.get("input[name=create-password]").type(correctPassword);
    cy.get("input[name=confirm-password]").type(`${correctPassword}{enter}`);

    cy.wait(1000);
    cy.getCookie("token").should("exist");

    cy.contains("login").should("not.exist");
    cy.contains(/latest post/i).should("be.visible");
  });

  it("failed to create user cypresstest that already exists", () => {
    cy.visit("/signup");

    cy.get("input[name=email]").type(uniqueEmail);
    cy.get("input[name=create-password]").type(correctPassword);
    cy.get("input[name=confirm-password]").type(`${correctPassword}{enter}`);

    cy.contains("The provided email is already taken").should("be.visible");

    cy.url().should("contain", "/signup");
  });

  it("failed to create user cypresstest that password not matchs exists", () => {
    cy.visit("/signup");

    cy.get("input[name=email]").type("new_cypress@email.com");
    cy.get("input[name=create-password]").type("123456");
    cy.get("input[name=confirm-password]").type("654321{enter}");

    cy.contains("Fail to register password does not matched").should(
      "be.visible",
    );

    cy.url().should("contain", "/signup");
  });

  it("should redirect to login page", () => {
    cy.visit("/signup");
    cy.contains(/login/i).click();

    cy.url().should("contain", "/signin");
  });
});
