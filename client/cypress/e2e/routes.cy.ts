describe("All router pages", () => {
  it("successfully visited all pages", function () {
    cy.visit("/");
    cy.get("#home").should("be.visible");

    cy.visit("/signup");

    cy.contains(/register/i);
  });
});
