describe("The Login Page", () => {
  it("successfully login user cypresstest", () => {
    cy.visit("/");
    cy.contains(/login/i).click();

    cy.get("input[name=email]").type("cypress_test@gmail.com");
    cy.get("input[name=password]").type("666666{enter}");

    cy.url().should("contain", "/");

    cy.wait(1000);
    cy.getCookie("token").should("exist");

    cy.contains(/login/i).should("not.exist");
  });

  it("failed to login user with wrong password", () => {
    cy.visit("/signin");

    cy.get("input[name=email]").type("cypress_test@gmail.com");
    cy.get("input[name=password]").type("wrongpassword");
    cy.contains(/Log in/i).click();

    cy.contains(/Login fail/i).should("be.visible");

    cy.url().should("contain", "/signin");
  });

  it("failed to login user with non exist email", () => {
    cy.visit("/signin");

    const unknownEmail = "unknown@email.com";
    cy.get("input[name=email]").type(unknownEmail);
    cy.get("input[name=password]").type("123456{enter}");

    cy.contains(`Email: ${unknownEmail} doesn't exists`).should("be.visible");

    cy.url().should("contain", "/signin");
  });

  it("should redirect to register page", () => {
    cy.visit("/signin");

    cy.contains(/signup/i).click();

    cy.url().should("equal", "/signup");
  });
});
