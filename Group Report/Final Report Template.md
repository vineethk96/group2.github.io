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
In the process of project development, we have formulated a clear realization process based on user requirements, from functional design to technical implementation, to ensure that the website can run smoothly and provide users with high-quality services. The following is a detailed description of the realization process of our website:

#### User interaction process

1. User Requirements Analysis
We defined three types of target users through user profiling and storyboarding: high school students (e.g. Tim), white-collar workers (e.g. Abby), and home users (e.g. Fiona).
Based on the user's behavioral patterns and needs, we designed key functional modules, including searching for specific birds, viewing distribution maps, and browsing related information.

2. User operation flow
After entering the website, users can select the region or bird species of interest through the search box or navigation bar on the homepage.
Based on the user's input, the page will dynamically display information about the distribution of the selected bird or a detailed description of the specific park.
The content of the page is interactive, for example, clicking on an image to view more detailed information about the bird or park.

#### Function realization process
1.Front-end function realization
Navigation and page switching.
Users can switch pages by clicking navigation buttons, and JavaScript dynamically controls the display and hiding of the content by listening to the onclick event. For example, JavaScript can dynamically control the display and hiding of the content by listening to the onclick event:
 
This design avoids repeated loading of pages and improves the user's browsing experience.
 
User interaction optimization.
The display: flex layout of each page aligns and distributes the content, making the browsing experience more consistent across devices. At the same time, CSS provides feedback on button clicks (e.g., color changes) to enhance the user's sense of operation.

2. Back-end data processing
Data Query and Transmission.

After the csv data is encapsulated as an api by the backend, the front-end applies to the server using http GET, and the server parses the csv file and processes it into JSON format and returns it to the front-end for further data processing. Take the green space and display it on the map page as an example. The frontend gets the data and creates a polygon of green space based on its coordinates and renders it on the map

3. Map Visualization
The map page has 2 functions: to look up bird sightings, and to visualize how close they are to local green spaces. It begins with the use of the Google Maps API which has a custom style to fit in with the overall color theme of the website. On top of that, looking up birds using the left sided search bar, provides users with a list of birds within the UK. Clicking through the birds will show you the ones within 25km of London, and paired with that is the bird sightings box on the right, which shows the total number of sightings for that searched for bird.This functionality uses 2 endpoints provided my NBN Atlas, and works by first searching for the common name to one endpoint, pulling the scientific name, and using that to search another endpoint to get the longitude and latitude. 

The green space range in the map is dynamically generated according to the latitude and longitude data returned from the backend to provide users with visual distribution information. The coordinate range of the green space is fetched from the backend encapsulated api and rendered on the map, and clicking on the map range shows the type, area, and access of the green space. At the same time, the green space is set to appear in a jumping way on the page to increase interest.

## 3.Storyboarding and Wireframes
### 3.1 User Storyboard
In the early design phase of the project, we build user storyboards to visualize the usage scenarios and interaction flow of the target users. These storyboards are designed based on the needs and behavioral patterns of typical users, which clarifies how users interact with the system and provides a clear direction for feature development.
Below are three major user scenarios:
  Tim's Journey of Discovery
Context: Tim is a high school student interested in wild birds, and he plans a weekend field trip to observe them.
Process:
Tim opens a website and searches for the bird “Lilac” to see a map of its distribution in a specific area (e.g. London).
The website shows the locations and descriptions of Lilacs, and he uses this information to make meaningful field notes.
 
  Abby's Leisurely Weekend
Background: Abby is a busy white-collar worker who wants to relax on a weekend.
Process:
Abby uses a website to do a quick search for parks in her neighborhood.
She finds and selects Greenland Park, reviews its profile and describes its amenities.
The website information helped her plan a relaxing picnic.
 
  Fiona's Family Day
Background: Fiona is a mother planning a day out with her children to find a park with animal displays and children's play equipment.
Process:
Fiona uses the website to find parks with these features.
The map page provides several options with detailed information about the parks.
Fiona easily selects the most suitable destination.
 
The storyboards illustrate the needs and behaviors of different users as they explore birds and find places to relax, informing the design and optimization of the site's features.

### 3.2 Wireframe Design
To ensure that the development team reached a consensus on the layout and functionality of the website, we used the Figma tool to design a clear wireframe diagram. The wireframes visualize the structure, layout and interaction of each page.
 
Home Page
Contains the navigation bar and the core content display area.
Users can use the navigation bar to quickly find the target content or use the navigation bar to switch to other pages (e.g. Birds page or About Us page).
The background is designed in soft earth tones to reflect the ecological theme.
 
Map Page
The left side displays basic information about the target birds (e.g., pictures, names, etc.), and the right side is a distribution map.
Users can view the detailed distribution location of birds on the map and get more information through interactive labeling.
 
Detail Page
Displays detailed information of birds, including classification, characteristics and other contents.
The page design is simple and intuitive, and the key information is presented in the form of cards.
 
Favourite Page
The user's favorite birds are arranged in a card layout, which is easy for users to browse and access quickly.
Each card contains a picture of the bird and basic information, providing a personalized experience for the user.
 
About Us Page
Contains the project introduction and contact us function.

### 3.3 The Role of Storyboards and Wireframes in Projects
Guiding Functional Design
Storyboards help us understand user requirements and make the functional design more targeted.
Wireframes provide a visual representation of the page structure, making the development process more efficient.
 
Optimize user experience
The storyboard clarifies the user behavior path and optimizes the navigation logic and interaction design of the page.
Wireframes provide clear layout references for functional development and ensure consistency of design goals.
 
Teamwork Support
As an important communication tool during the development process, wireframes ensure that team members have a consistent understanding of the page layout and functional implementation.


## 4.Data Collection and Visualization
In order to ensure that the website can effectively meet the needs of users, we have carefully designed the data collection and visualization process, through the integration of a variety of data sources and technical means, to achieve the accurate display of bird distribution information, and provide a rich user interaction experience.
Data Collection
The data of the website mainly comes from public ornithological databases and geographic information services, which cover the core information of birds' classification, habitats, habitats and geographic distribution. In addition, we use Google Maps API to dynamically obtain geographic location data, which is used to label bird distribution points on the map. In order to ensure the accuracy and relevance of the data, we cleaned and categorized the collected data during the development process, such as grouping birds by their family, genus and species attributes, and associating the distribution data with specific geographic coordinates. This processing not only improves the organization of the data, but also lays the foundation for the visual display of maps and charts.
 
Data Visualization
Making it easy for users to navigate between different information, we developed various informational visualization forms involving maps, charts, and card layouts that amplified the website usability and interactivity level.
 
In the map visualization section, the Google Maps API enables presenting the location data of birds as a point which ties to a specific observation. When so the users can click on the markers to bring out detailed data like bird name, habitat type, and so on to describe the birds. The map not only displays the different species via icons and colors of varying hues, but this also helps one easily orient and relate to the various types of habitat. In the Overview page, the items are displayed as ring and bar charts that illustrate the ratio of birds in different habitats and the amount of birds in the region. This user-attractive and durable data presentation allows users to apprehend instantly the general and ecological background to birds.
 
Moreover, a card layout will be employed in order to show the nut-shell information. Users can flip the “Detail Page” and “Favourite Page” to see the pictures, names, and a short description of the birds, and get a more detailed list by clicking a specific card. The design of the card layout is straightforward but visually appealing for both a quick scan of the catalog and a determinant selection, and results in the highest user comfort level.

### Data Interaction
To be able to connect between data storage and users' job operations effortlessly, we invented a dynamic search and filtering function system. After the user enters a keyword into the search box on the home page, the front-end sends the request to the back-end via REST API, and the back-end parses the query and returns the corresponding data set. The backend gets the query from the user and returns a dataset of the respective query. Upon the query completion, the requested data will be fetched by the backend and will be displayed on the front end, which will dynamically reflect the changes. Likewise, once the user inputs "birds", the homepage will show those birds' related card information, and we will also show a map with the area they prefer in. Dynamic update makes the pages responsive, also providing continuous engagement to the users.
 
In addition to that, by employing the data binding functional capability of JavaScript, the map which is part of this page is linked together with the webpage content, and it is ensured that the distribution data update is made available in real time. Besides this, the design guarantees instant availability of data that in turn fires the users' curiosity on the exploration.
 
The part of the project that is responsible for collecting and visualizing the data is the core one. The inclusion of the ornithological databases and the geographic information services allow accurate bird distribution information presentation. Through map annotation, data analysis and the card layout creation, we offer users a cutting-edge tool that is genial, intuitive and supports numerous undertakings at once. This visualization, besides its appreciation of fundamental users, is also a building block for further data examination and opens a door for looking at the yet unappraised aspects of avian ecosystems.

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
