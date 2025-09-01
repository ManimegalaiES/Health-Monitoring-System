**Personalized Health Monitoring System with Machine Learning**

This project presents a smart health monitoring web platform that leverages machine learning to evaluate patient vital signs and determine their health risk level. It acts as an early-warning system by identifying unusual patterns in real time and delivering personalized health recommendations to users.

**Key Features**

Risk Classification: Predicts whether a patient falls under High Risk or Low Risk based on their vitals.

ML-Driven Predictions: Employs a Decision Tree model with an achieved accuracy of 91.78%.

AI-Based Suggestions: Uses the Gemini API to provide personalized healthcare advice.

Interactive Interface: Built with React for a clean, responsive, and dynamic user experience.

Data-Backed Insights: Trained on a large dataset of clinically validated patient records for reliability.

**Technology Stack**

Frontend: React.js, React Router, Framer Motion for smooth animations

Backend: Flask with REST API endpoints in Python

Machine Learning: Decision Tree (scikit-learn) with Pickle for model deployment

API Integration: Gemini Generative AI for smart recommendations

Supporting Tools: NumPy, Pandas, Matplotlib, VS Code

**Dataset Information**

Origin: Dataset derived from clinically validated patient vital signs

Attributes: Includes Heart Rate, Respiratory Rate, Oxygen Saturation, Blood Pressure, Body Temperature, Age, Gender, Height, Weight, HRV, BMI, and MAP

Size: Over 200,000 patient samples

Label: Binary classification into High Risk or Low Risk categories

**Model Development & Results**

Algorithms Evaluated: Decision Tree, Random Forest, One-Class SVM, Logistic Regression, Naive Bayes

Chosen Model: Decision Tree (Entropy Criterion) providing 91.78% accuracy

Data Preparation: Applied Min-Max scaling, handled outliers, and encoded categorical variables

Performance Metrics: Evaluated using Precision, Recall, F1-Score, Specificity, and Confusion Matrix

**Accuracy Results Across Models:**

Decision Tree → 91.78%

Random Forest → 84.71%

Logistic Regression → 81.80%

Naive Bayes → 90.42%

**Project Objective**

The system is designed to function as an accessible, real-time healthcare assistant that:

Monitors and evaluates user health indicators

Generates instant feedback and AI-driven advice

Assists in reducing dependency on clinical resources by enabling early detection and self-assessment

**Future Enhancements**

Integration with EHR: Linking with electronic health records for patient-specific analysis

IoT and Wearables: Real-time data input from smart health devices and trackers

Automated Alerts: Immediate notifications for abnormal health conditions

Deep Learning Expansion: Incorporating image-based diagnostics for broader medical applications
