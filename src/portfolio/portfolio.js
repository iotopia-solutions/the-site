export const portfolioObj = {
  "dog-watch": 
  {
    clientName: "Dog Watch",
    category: "Connected Devices",
    categoryFilter: ".connected-devices",
    projectTitle: "SmartFence",
    projectSubtitle: "",
    technologies: "Hardware Design, Embedded Linux, Python, 900MHz Wireless",
    projectLink: "http://www.dogwatch.com/",
    projectImage: ["/img/portfolio/placeholder_1300_894.png"],
    description: "Dog Watch manufactures hidden electronic pet fences that keep pets safe. We helped them develop an intelligent collar that combines both hidden fence and activity measuring capabilities so owners can keep their pets safe while ensuring they get enough exercise. The collar allows pets to play securely in their own yard while owners track their activities from either a web site or a dedicated mobile app. The collar is an unusual mix of active radio transmitters that communicate with a local portal connected to the user’s home network via WiFi or Ethernet. The portal communicates directly with a cloud service that converts raw data to JSON messages. It passes these messages to a web server, which serves both the web site and the app. With our expertise in IoT, we developed the portal and the cloud-based system. The portal runs on Raspberry Pi and the cloud system runs on Amazon’s Web Services. Both are Python based.",
    details:
    {
      problem: "Dogwatch wanted to make a “smart” connected system to enhance the successful systems that they have been building for years.  They wanted a way to allow the system to alert its users and dealers to issues related to the systems’ status or their dogs so that they can reduce house calls and keep pets stay safe.",
      solution: "Iotopia Solutions helped Dogwatch to design and develop a smart, connected system.  Iotopia provided Dogwatch with the knowledge and talent to develop a system-level solution that incorporates smart, connected embedded-linux systems with a robust back-end to connect these devices."
    }
  },
  "farmobile": 
  {
    clientName: "Farmobile",
    category: "Connected Devices, Big Data, Fault Tolerant",
    categoryFilter: ".connected-devices, .big-data, .fault-tolerant",
    projectTitle: "PUC - Passive Uplink Connection",
    projectSubtitle: "",
    technologies: "Embedded Linux, Cellular, Wifi, Python, MQTT, Embedded Database",
    projectLink: "https://www.farmobile.com/",
    projectImage: ["/img/portfolio/farmobile_thumb.png"],
    description: "Agriculture has become an increasingly data-driven industry.  Machinery vendors have added big-data capabilities to their products but walled them off from farmers. Farmobile allows farmers to access, control and monetize the agronomic data captured by the machinery they use. We developed Farmobile’s “PUC” (Passive Uplink Connection), an IoT device that plugs into the data bus of agricultural equipment. The PUC records and transmits the time, position and other relevant agricultural information generated when cultivating a field. It can be used in devices located anywhere and remotely managed, and has store-and-forward capability when it can’t find a cellular or wifi connection. It’s transparent to the machinery that it’s connected to and only captures data. We provided software and hardware development for Farmobile and trained their staff so that when the PUC entered production they were able to take ownership of software development.",
    details:
    {
      problem: "Farming machinery has become smart.  Companies producing agricultural equipment control this machinery and the data that it generates.  Farmers need an open way to capture and store their own data, allowing them to use the data the way they want.  This data is valuable and allows them to make decisions to improve their yields and hence profitability.",
      solution: "The Farmobile PUC allows farmers to collect data while planting, spraying and harvesting from their fields. This allows them to control and document all aspects of their activities.  We provided the engineering knowledge to develop the PUC enabling seamless, fault-tolerant data collection and storage into the cloud."
    }
  },
  "perkin-elmer": 
  {
    clientName: "Perkin Elmer",
    category: "Web",
    categoryFilter: ".web",
    projectTitle: "Elements Web Application Re-architecture",
    projectSubtitle: "",
    technologies: "ReactJS, Redux, Webpack, Pattern Lab, Sass CSS",
    projectLink: "http://elements.perkinelmer.com",
    projectImage: ["/img/portfolio/pe_thumb.png", "/img/portfolio/pe_2.png", "/img/portfolio/pe_3.png"],
    description: "Electronic lab books have become a key tool used by drug companies in their development process. Perkin Elmer hired us to evaluate and update their Elements Electronic Lab Notebook, which stores information on chemistry, images and revision history. They had recently purchased a cloud-based application, which was experiencing performance issues, from a small startup. The application’s development cycle was costly because of an old and unsupported technology stack. We evaluated it from front end to back, including all of its ancillary applications and libraries and made numerous recommendations for improvements. The roadmap we developed became a guide for future revisions.",
    details: 
    {
      problem: "After completing our initial discovery phase, we came under the conclusion that the existing technology stack of JavaScriptMVC (an old JavaScript framework, predecessor to current CanJS), several versions of jQuery, and convoluted implementation of third party software was causing performance issues and hindering the ability of the product to expand. As a result of this conclusion, we researched several solution options and recommended a new technology stack that will help in the extensibility of the product.",
      solution: "After evaluating several JS frameworks, we agreed to use ReactJS along with a Flux implementation pattern which eventually morphed into a Redux framework implementation. To support our effort, we extracted the design and created a complementary Pattern Lab site. We also implemented Gulp and a NodeJS server to handle some of the ancillary tasks. All these efforts were completed with proper documentation and guidelines for future developers to learn and use."
    }
  },
  "humedica": 
  {
    clientName: "Humedica",
    category: "Web, Big Data",
    categoryFilter: ".web, .big-data",
    projectTitle: "Analysis of Optum One Analytics",
    projectSubtitle: "Migrating from Adobe Flex to HTML",
    technologies: "HTML & CSS (Pattern Lab, HTML5 best practices, Sass CSS), JavaScript Framework (ReactJS, Redux, NodeJS/NGinX servers), Helpers (ESLint, WebPack, Babel, Unit Test Mocha + Chai, Yeoman Generators)",
    projectLink: "https://www.optum.com/solutions/data-analytics.html",
    projectImage: ["img/portfolio/humedica_thumb.png", "img/portfolio/humedica_2.png", "img/portfolio/humedica_3.png", "img/portfolio/humedica_4.png"],
    description: "Big data helps deliver the best healthcare to patients. Humedica’s Optum One is a healthcare analytics system that allows medical researchers to query large data sets and produce tables, charts and other types of data visualization. We created a proof of concept for the migration of Optum One from Adobe Flex to JavaScript. After evaluating the current state of the application, we developed a roadmap for the implementation of JavaScript and our POC became the template for future development of the legacy application.",
    details: 
    {
      problem: "Iotopia Solutions was brought in to help Humedica create a proof of concept around the migration their Optum One Analytics system from Adobe Flex to JavaScript. Optum One is an informatics system for patient care that allows medical researchers to query large data sets and produce tables, charts and other types of data visualization. After evaluating the current state of the application, we developed a roadmap for the implementation of JavaScript. The POC was used as a template for future development of the legacy application.",
      solution: "After evaluating the current infrastructure, we provided our research and report that outlined several different solutions. With the partnership with the internal team, we recommended a new front end technology stack and worked closely with the team to implement a proof of concept on a small scale."
    }
  },
  "hbr": 
  {
    clientName: "Harvard Business Review",
    category: "Web",
    categoryFilter: ".web",
    projectTitle: "Harvard Business Review: The Big Idea",
    projectSubtitle: "Developing in an Experimental Endeavor",
    technologies: "Custom JS framework, Sass CSS, JQuery, HTML, BrowserStack, WordPress",
    projectLink: "http://hbr.org/rebel",
    projectImage: ["img/portfolio/hbr_thumb.png"],
    description: "Harvard Business Review (HBR) started as a well-known print source for business and management experts. Their effort to make the articles, case studies, and resources available online broadened the accessibility and audience to these publications. More recently Harvard Business Review decided to decrease the number of magazines issued a year from ten to six. To boost enthusiasm and involvement, HBR sought to provide subscribers with a new and more engaging experience to complement each print in an online series called 'The Big Idea'.",
    details: 
    {
      problem: "“The Big Idea” was a new addition to HBR’s website. Equipped with a plan, a design, and a new approach for its implementation, the feature required close cross-functional team coordination especially to meet a tight deadline. The challenge was to develop a template that was mobile-first, reusable, and flexible as it would be the first of a series of six engagements experimenting with a new way for subscribers to consume.",
      solution: "Iotopia Solutions involvement helped HBR meet its goal for the first release of “The Big Idea” series. Testing occurred frequently during development and involved using real devices, BrowserStack, as well as different browsers to ensure compatibility.  The development process also entailed tailoring design choices that were responsive and would lend to flexibility for showcasing components in different states."
    }
  },
  "bosch": 
  {
    clientName: "Bosch",
    category: "Connected Devices",
    categoryFilter: ".connected-devices",
    projectTitle: "Bosch CCU",
    projectSubtitle: "Connected RV demonstration",
    technologies: "CAN, MQTT, Python, embedded Linux, Raspberry Pi",
    projectLink: "",
    projectImage:["img/portfolio/bosch_thumb.jpg"],
    description: "Americans love to go camping, and RVs make it fun and convenient.  As a nation, we enjoy more than <a href='https://www.reserveamerica.com/outdoors/a-short-history-of-camping.htm'>2 million RV excursions</a> in our homes-away-from-home every year.  But as IoT has allowed homes to become smarter and more convenient, can RVs keep up?  Bosch thought so, and they planned to prove it at the upcoming <a href='http://www.rviashow.org'>RVIA 2016 trade show</a> – <i>in two weeks</i>.",
    details: 
    {
      problem: "From a high level, there were two problems to solve: RVs don't 'speak cloud' and they are rarely connected to the internet.",
      solution: "Iotopia Solutions quickly procured the ideal hardware platform for ultra-rapid development, connected on-board cellular modems, and customized the OS.  We successfully followed up with working connectivity software and installation scripts in time for Bosch to have an impressive demonstration booth at RVIA 2016!"
    }
  },
  "zoll": 
  {
    clientName: "ZOLL",
    category: "Web, Connected Devices, Data Visualization, Telemedicine, IoT, Cloud, I18N",
    categoryFilter: ".web, .connected-devices, .data-visualization, .telemedicine, .IoT, .cloud, .I18N",
    projectTitle: "ZOLL WebConsole",
    projectSubtitle: "Cloud server Push System",
    technologies: "Python, Twisted, ZOPE, JavaScript, Dojo, HTML5, WebSockets, PDF generation",
    projectLink: "https://dojotoolkit.org/blog/case-study-zoll-web-console",
    projectImage: ["img/portfolio/zoll_thumb.png"],
    description: "It’s a simple fact of life that there will always be more people needing medical care than there are medical professionals to care for them. This is particularly true in the aftermaths of disasters or in emergency situations. ZOLL is a worldwide leader in resuscitation technology, and their <a href='https://www.zoll.com/medical-products/defibrillators/x-series/EMS/'>X Series</a> defibrillator / monitor is widely considered one of the most capable such devices on the planet. One of its standout features is its communications capability, as it has not just the ability to stream out live data using standard Web technologies using human-readable formats, but also serves a Web app via local networking that can display this live data or dump it out in PDF reports. This WebConsole solution enables a single medical professional to quickly see the vitals and waveforms for many patients in an efficient manner. The ZOLL WebConsole is used by the two U.S. Navy ships <a href='http://www.med.navy.mil/sites/usnscomfort/'>USNS Comfort</a> (the world’s largest hospital ship) and the <a href='http://www.med.navy.mil/sites/usnsmercy/'>USNS Mercy</a>.",
    details: 
    {
      problem: "1) The original WebConsole (which Iotopia personnel helped design and develop, too) was designed to function as a server over local Ethernet or WiFi networks. To fully realize the vision of telemedicine though it is necessary to make the WebConsole act like a client and push this data out to a cloud-based server for retransmission via the cellular network in an emergency response vehicle to facilities with specialists.<br>2) The original WebConsole was English-only. There is demand for it in many other markets, too.",
      solution: "1) We added a new mode of operation to the X Series that allowed it to stream its data to a custom cloud server that could in turn stream the data down to medical personnel using ordinary browsers. We worked closely with multiple ZOLL teams in three states to integrate this in with both their existing solutions and new software made to support the effort.<br>2) Using internationalization features in both Python and Dojo we added the necessary translation strings and format changes."
    }
  },
  "kronos": 
  {
    clientName: "Kronos",
    category: "Web, Big Data",
    categoryFilter: ".web, .big-data",
    projectTitle: "Creating a New Path",
    projectSubtitle: "Filling the performance and communication gaps",
    technologies: "AngularJS, NodeJS, Big data management",
    projectLink: "https://www.kronos.com/products/workforce-central-suite",
    projectImage: ["/img/portfolio/kronos_thumb.png", "/img/portfolio/kronos_2.png"],
    description: "Kronos Workforce Central is a commercial Web application focused on timekeeping, scheduling, attendance, and other human resources and time management needs. It uses real-time information to allow managers to track work status, cost, time and more in order to ensure compliance with pay rules and other regulations. We evaluated the software applications that comprise Kronos’ Workforce Suite, looking specifically at its technology standards, team communication and its development cycle. We also evaluated the performance of several other applications i.e. Workforce Timekeeper,  Workforce Scheduler, Workforce Absence Manager, Workforce HR, and Workforce HR in order to examine the technology being used and ensure that proper front end development standards are being used.",
    details:
    {
      problem: "As Kronos was slowly migrating from their legacy application, which was built in Adobe Flex, to a new browser based platform; they were confronted with some performance issues in the implementation. Iotopia Solutions was brought in to help evaluate the current state and provide recommendations to help with current performance issues and help set the proper infrastructure to combat future issues.",
      solution: "Our goal for this project was to evaluate their current state and recommend solutions. Our team performed the following:<ol><li>Evaluated the multiple teams that make up the individual applications of the Workforce Suite. The areas that were evaluated were:<ol type='a'><li>Technology standards</li><li>Team communication</li><li>Software development cycle</li></ol></li><li>Evaluated performance issues within different applications<ol type='a'><li>Technology used and best standards</li><li>Ensuring that proper front end development standards are implemented</li></ol></li></ol>"
    }
  }
}
