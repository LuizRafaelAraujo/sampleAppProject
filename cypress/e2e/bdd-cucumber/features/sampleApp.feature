Feature: Automating Sample App

  Scenario: Fill out Sample App Automobile Insurance form and verify success message
    Given I am on the Sample App Automobile Insurance page
    When I fill out the "Enter Vehicle Data" form and click "Next"
    And I fill out the "Enter Insurant Data" form and click "Next"
    And I fill out the "Enter Product Data" form and click "Next"
    And I fill out the "Select Price Option" form and click "Next"
    And I fill out the "Send Quote" form and click "Send"
    Then I should see the message "Sending e-mail success!"
