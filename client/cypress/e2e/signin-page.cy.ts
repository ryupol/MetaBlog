describe("Signin Page", () => {
  const testEmail = "cypresstest@gmail.com";
  const testPassword = "test123";

  it("should redirect to register page", () => {
    cy.visit("/signin");
    cy.contains(/signup/i).click();

    cy.url().should("contain", "/signup");
  });

  it("failed to login user with wrong password", () => {
    cy.visit("/signin");

    cy.get("input[name=email]").type(testEmail);
    cy.get("input[name=password]").type("wrongpassword");
    cy.contains(/Log in/i).click();

    cy.contains(/Login fail/i).should("be.visible");

    cy.url().should("contain", "/signin");
  });

  it("failed to login user with non exist email", () => {
    const unknownEmail = "unknown@email.com";

    cy.visit("/signin");

    cy.get("input[name=email]").type(unknownEmail);
    cy.get("input[name=password]").type(`${testPassword}{enter}`);

    cy.contains(`Email: ${unknownEmail} doesn't exists`).should("be.visible");

    cy.url().should("contain", "/signin");
  });

  it("successfully login", () => {
    cy.visit("/");
    cy.contains(/login/i).click();

    cy.get("input[name=email]").type(testEmail);
    cy.get("input[name=password]").type(`${testPassword}{enter}`);

    cy.wait(1000);
    cy.getCookie("token").should("exist");

    // Home page
    cy.contains(/login/i).should("not.exist");
    cy.contains(/latest post/i).should("be.visible");
  });
});
