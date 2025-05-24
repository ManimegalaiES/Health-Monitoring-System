**Personalized Health Monitoring System using Machine Learning**

An intelligent health monitoring web application designed to analyze patient vitals and predict risk levels using machine learning.This system enables early detection of health anomalies and provides personalized health recommendations in real-time.

**Features:**

Predicts High Risk / Low Risk using vital signs.

Built-in Decision Tree ML model with 91.78% accuracy.

Smart suggestions using Gemini API.

React frontend and Flask backend with REST API integration.

Clean UI with real-time risk prediction and feedback.

Utilizes real-world patient data for better reliability.

**Technologies Used:**

**Frontend**: React.js, Framer Motion, React Router

**Backend**: Flask REST API, Python

**ML** **Model**: Decision Tree (scikit-learn), Pickle

**API**: Gemini Generative AI for health suggestions

**Others**: NumPy, Pandas, Matplotlib, VS Code

**Dataset:**

**Source**: Clinically verified human vital signs dataset.

**Attributes** include: Heart rate, Respiratory rate, Oxygen Saturation, Blood Pressure, Body Temperature, Age, Gender, Height, Weight, HRV, BMI, MAP

**Total** **samples**: Over 200,000

**Target**: Risk Category (High Risk / Low Risk)

**Model** **Training**:

**Algorithms** **tested**: Decision Tree, Random Forest, One-Class SVM

**Final** **Model**: Decision Tree (Entropy-based) with 91.78% accuracy

Preprocessing included Min-Max Scaling, outlier detection, and label encoding

**Evaluation** **Metrics**: Confusion Matrix, Precision, Recall, F1-Score, Specificity

**Objective**:

To develop a smart, accessible, and real-time health support tool that:

Predicts user risk levels based on vital input

Offers instant feedback and intelligent suggestions

**Results** (Accuracy %):

Decision Tree: 91.78

Random Forest: 84.71

Logistic Regression: 81.80

Naive Bayes: 90.42

Eases burden on clinical resources with early detection and self-assessment

**Future** **Scope**:

Integration with EHR systems for personalized diagnostics

Development of health wearables and IoT integration

Smart anomaly alerts with real-time notifications

Image-based diagnostics using deep learning
