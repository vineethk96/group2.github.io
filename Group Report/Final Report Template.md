<!---

---
title: "CASA0017: Web Architecture Final Assessment"
author: "Steven Gray, Valerio Signorelli, Duncan Wilson, Sarah Wise"
date: "10 Dec 2020"
---

-->

# CASA0017

Birds World

## Abstract
With the rise of eco-tourism and the growing interest in natural environments and wildlife, it is important to provide a convenient information platform for travelers and bird enthusiasts. Our project aims to develop a website that focuses on providing users with maps and profiles of birds to help them better explore the natural environment(London Datastore, 2021). Through this platform, users can easily access the distribution information of a particular bird species and quickly learn about it to fulfill their needs in the process of field exploration and learning.

## Introduction
In a broader research context, ecological conservation and data visualization has become an area of great interest in recent years(NBN Atlas, 2023). Globally, many studies and platforms have been digitized to help people better understand and engage with natural resources. However, most of the existing platforms usually target specific ecological regions or high-level professional users, and lack intuitive and full-featured tools designed for general users. Our project addresses this problem by providing a simple, easy-to-use interactive interface for the average traveler and birder, while enhancing the user experience with map visualization and real-time data interaction techniques.
In addition, the project also focuses on data presentation and integration, by introducing the Google Maps API and REST API, to dynamize static data and help users intuitively access the information they need. Whether professional bird watchers or beginners, this platform can support them and further promote the public's concern and protection of natural ecology. Through this project, we hope to explore the possibility of combining design, technology and ecological protection, and contribute to the sustainable development of society.

## Methodology
### 2.1 Tools and Technology
In order to achieve the goals of the website from design to development, our team used a series of precise and efficient technical tools, covering both front-end and back-end development, while adopting a modular architecture to ensure smooth implementation of the functions and stability of the system. Below is a detailed description of each technology tool:
#### Front-end technologies
  HTML and CSS
Purpose: Used to build the basic structure and visual style of the page, HTML defines the core content of the page, CSS provides aesthetic style and layout design.
Scenarios: The basic framework of each page (e.g. Favorites).
The basic framework of each page (e.g., Favorite Page and About Us Page) is built through HTML to ensure a clear hierarchy of content.
CSS is used to design color themes (e.g. background color rgb(246, 235, 194)) and page layouts (e.g. display: flex layout flexibility).
Responsive design is implemented in the code, e.g. by controlling the layout through box-sizing and flexbox, which improves the usability of the page.

  JavaScript
Purpose: Provides page interaction functionality, enabling real-time feedback of user actions to the interface.
JavaScript is used to control the display and hiding of different pages or components during page jumps and function switches.
A search function is provided, which captures user input via prompt and dynamically adjusts the displayed content (e.g. “eagle” or “crow”) based on the input.

  jQuery
Purpose: Simplifies DOM manipulation and event handling.
Scenario: In the chat page, jQuery is used to capture user input and dynamically update the content of the chat, while dynamically adjusting the interface display based on CSS styles.

  page design and implementation
The page search function allows the user to input keywords to filter the content dynamically, e.g. “eagle” displays all birds relevant to the searched topic of eagle.

 image processing and dynamic effects
The page uses a large number of image resources, and through the CSS control of the image border rounding effect (such as border-radius: 50%) and dynamic background layer, to enhance the visual appeal of the page.

 Technology Integration
By using a combination of HTML, CSS and JavaScript, we realized the following key features:
Modular Layout: Each page component is independent, making it easy to maintain and extend.
Dynamic Interaction: Using JavaScript to control page logic switching improves the user experience.
Style Consistency: By reusing styles, we ensure the consistency of the overall style of the website.

#### Backend Technology
   Node.JS and Express.JS
Purpose: NodeJS provides an efficient non-blocking server-side environment, while ExpressJS, a framework for NodeJS, simplifies routing and API development.The runtime environment is ensured.
Express.js is a web development framework based on Node.js. In this project, I am mainly responsible for:
HTTP Server features
Handling HTTP requests
Provides RESTful API interface
Manage server ports and listening
Data flow management and dynamic routing management
Csv-parser is used to parse csv files, read the contents of CSV files and dynamically generate wrapper apis.

Scenarios: The routing system of ExpressJS is used to process user requests, such as querying bird distribution information based on user input, and sending the data to the front-end via a REST API.
Dotenv: Used to manage environment variables
Cors: Handle cross-domain resource sharing and related middleware

  RESTful API

Purpose: The RESTful API enables standardized data interaction between the front-end and back-end, allowing users to obtain data through simple HTTP requests.
Application Scenario: When the user selects a certain bird, the front-end will send a GET request to the back-end via the RESTful API, and the back-end will call the database according to the request parameters and return detailed information about the bird and its distribution map.

Google Maps API
Purpose: Google Maps API provides map services and geographic data visualization.
Scenario: On the map page, we use the Google Maps API to generate a dynamic map with annotations showing the distribution of birds, and the API call involves a variety of parameters, including the scope of the area, the style of the annotation, and interactive features.

### 2.2 Realization process






## Conclusion
This project has achieved remarkable results in visualizing bird distribution information, optimizing user experience, and improving interactive functions. Hence, it is a practical and intuitive solution for this target group. Moreover, we will rely on the current results to make further improvements on the website by enhancing the number of functionalities, enriching the content and intelligent upgrades. This work not only helps users to learn how to study the nature of birds, but also to participate in nature conservation, putting the society on the path of ecological conservation.

## Biblography
1.London Datastore (2021). GiGL Spaces to Visit – London Datastore. [online] London.gov.uk. Available at: https://data.london.gov.uk/dataset/spaces-to-visit#: [Accessed 3 Jan. 2025].

2.NBN Atlas (2023). NBN Atlas - UK’s largest collection of biodiversity information. [online] NBN Atlas. Available at: https://nbnatlas.org/ [Accessed 28 Dec. 2024].

3.Sidebar (n.d.). Sidebars · Bootstrap v5.3. [online] getbootstrap.com. Available at: https://getbootstrap.com/docs/5.3/examples/sidebars/.


----

## Declaration of Authorship

We, Vineeth Kirandumkara, Qiqing Dai, Jinming Xia Xinming Feng, confirm that the work presented in this assessment is my own. Where information has been derived from other sources, I confirm that this has been indicated in the work.


Digitally Sign : Vineeth Kirandumkara, Qiqing Dai, Jinming Xia Xinming Feng

ASSESSMENT DATE: 13/01/2025
