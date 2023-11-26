describe("ApplyForm Component - End-to-End Test", () => {
  it("submits the form successfully", () => {
    cy.visit("http://localhost:5173/proposals/4/apply");

    // Assuming your form elements have the expected labels and class names
    cy.get('label:contains("Message to the supervisor:")')
      .next("textarea")
      .type("This is my application message");

    // Submit the form
    cy.get('button:contains("Submit Application")').click();

    // Check that you're sent back to the homepage
    cy.url().should("eq", "http://localhost:5173/"); // Adjust the URL as needed  });
  });
  it("handles form submission error", () => {
    cy.visit("http://localhost:5173/proposals/4/apply");

    // Trigger a form submission error (e.g., by mocking the API response)
    cy.intercept("POST", "http://localhost:3001/applications", {
      statusCode: 500,
      body: "Internal Server Error",
    }).as("submitApplication");

    // Assuming your form elements have the expected labels and class names
    cy.get('label:contains("Message to the supervisor:")')
      .next("textarea")
      .type("This is my application message");

    // Submit the form
    cy.get('button:contains("Submit Application")').click();

    // Wait for the form submission request to complete
    cy.wait("@submitApplication");

    // Assert that the error alert is displayed
    cy.contains("Sorry!").should("exist");
    cy.contains("There was an error while submitting your application").should(
      "exist"
    );
  });
});
