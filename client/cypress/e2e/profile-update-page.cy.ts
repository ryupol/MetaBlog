describe("Profile Update Page", () => {
  const testName = "cypresstest";
  const testEmail = "cypresstest@gmail.com";
  const testPassword = "test123";
  const profile = "cypress/fixtures/images/defaultProfile.jpg";
  beforeEach(() => {
    cy.login(testEmail, testPassword);
  });

  it("successfully update user info and update back to old info", () => {
    cy.visit("/");
    cy.get('[data-cy="user-profile"]').click();
    cy.contains(testEmail).should("be.visible");

    cy.contains(/edit profile/i).click();

    cy.url().should("contain", "/profile/update");

    const newEmail = "cypress_eiei@email.com";
    const newName = "Eiei jung";
    const newProfile = "cypress/fixtures/images/profile.jpg";

    cy.get('[data-cy="profile-input"]').click().selectFile(newProfile);
    cy.get("input[name=name-input]").type(newName);
    cy.get("input[name=email-input]").type(newEmail);

    cy.contains(/save/i).click();

    // confirm that it direct back to home page
    cy.contains(/latest post/i).should("be.visible");
    cy.get('[data-cy="user-profile"]').click();
    cy.contains(newName).should("be.visible");
    cy.contains(newEmail).should("be.visible");
    // change back
    cy.contains(/edit profile/i).click();
    cy.get('[data-cy="profile-input"]').click().selectFile(profile);
    cy.get("input[name=name-input]").type(testName);
    cy.get("input[name=email-input]").type(`${testEmail}{enter}`);

    // confirm that it direct back to home page
    cy.contains(/latest post/i).should("be.visible");
    cy.get('[data-cy="user-profile"]').click();
    cy.contains(testName).should("be.visible");
    cy.contains(testEmail).should("be.visible");
  });

  it("should cancel update user", () => {
    cy.visit("/profile/update");

    const newEmail = "Cancel@email.com";
    const newName = "Cancel jung";

    cy.get("input[name=name-input]").type(newName);
    cy.get("input[name=email-input]").type(newEmail);

    cy.contains(/cancel/i).click();

    // confirm that it direct back to home page
    cy.contains(/latest post/i).should("be.visible");

    cy.get('[data-cy="user-profile"]').click();
    cy.contains(testName).should("be.visible");
    cy.contains(testEmail).should("be.visible");
  });
});
