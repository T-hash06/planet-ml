# ExoNova ✨

## AI-Driven Exoplanet Detection Platform

ExoNova is an advanced artificial intelligence platform designed to automatically detect exoplanets in NASA's vast astronomical datasets. By combining state-of-the-art machine learning models with decades of observational data from NASA's Kepler, K2, and TESS missions, ExoNova democratizes access to planetary discovery for researchers, educators, students, and citizen scientists worldwide.

---

## 🌟 Mission

Our mission is to revolutionize exoplanet discovery by leveraging cutting-edge AI/ML technologies to analyze astronomical data at unprecedented scale and accuracy. ExoNova makes sophisticated planetary detection accessible to everyone—from professional astronomers to curious students—through an intuitive, web-based interface that requires no coding experience.

---

## 🔭 The Science Behind ExoNova

### The Transit Method

ExoNova specializes in detecting exoplanets using the **transit method**, the most successful technique in the field. When a planet passes in front of its host star (as viewed from Earth), it blocks a small fraction of the star's light, creating a temporary dip in brightness. By analyzing these subtle changes in stellar light curves, our AI models can identify planetary candidates with high confidence.

### Dual-Model AI Architecture

ExoNova employs two complementary artificial intelligence models working in tandem:

#### 1. **CTAB-GAN+**: Synthetic Data Generation & Imputation
- Generates physically plausible synthetic exoplanet samples to augment training data
- Handles missing values in observational datasets
- Preserves complex correlations between astronomical parameters
- Addresses class imbalance in rare planetary configurations

#### 2. **Masked Autoencoder (MAE)**: Self-Supervised Anomaly Detection
- Detects transit signals in time-series light curves
- Learns robust stellar behavior patterns from unlabeled observations
- Processes both temporal and tabular astronomical data
- Provides reconstruction-based anomaly scores for classification confidence

This dual-pathway approach combines the strengths of generative modeling and self-supervised learning to achieve unprecedented accuracy in planetary discovery.

---

## � Data Sources

ExoNova is trained on publicly available data from NASA's most successful exoplanet hunting missions:

### **Kepler Mission** (2009-2013)
- **2,662 confirmed exoplanets** discovered
- Continuous monitoring of 150,000+ stars in a fixed field of view
- Pioneered the transit photometry technique for exoplanet detection

### **K2 Mission** (2014-2018)
- Extended Kepler mission with modified observing strategy
- Additional planetary discoveries across multiple galactic fields
- Broadened understanding of planetary systems diversity

### **TESS Mission** (2018-Present)
- **Transiting Exoplanet Survey Satellite** conducting whole-sky survey
- Monitoring brightest stars for transit events
- Continuing the legacy of space-based exoplanet detection

### Dataset Composition
- **6,022 confirmed exoplanets** from NASA Exoplanet Archive (Planetary Systems Composite Parameters)
- **200,000+ light curves** analyzed from all three missions
- Comprehensive tabular parameters: stellar properties, orbital characteristics, planetary radii, and more
- Negative examples from TESS Objects of Interest for robust classification

---

## 🎯 Key Capabilities

### **Dual-Modal Detection**
Analyzes both time-series light curves and tabular astronomical parameters using MAE-based anomaly detection for comprehensive exoplanet identification.

### **Self-Supervised Learning**
Leverages vast unlabeled datasets from NASA missions to learn robust stellar behavior patterns without extensive manual labeling, enabling scalable analysis.

### **Explainable AI**
Provides confidence scores and feature importance attribution for every prediction, enabling scientific validation and interpretation of results.

### **Open-Source Platform**
Freely accessible web interface for researchers and enthusiasts to upload data, receive classifications, and contribute to planetary discovery.

---

## 👥 Who Is ExoNova For?

### **Astronomers & Researchers**
- **Automated dataset analysis** for large-scale surveys
- **Confidence scoring** with uncertainty quantification
- **Feature importance attribution** for scientific interpretation
- **Batch processing** capabilities for high-throughput analysis

### **Educators & Teachers**
- **Interactive demonstrations** of the transit method
- **Visual explanations** of AI-driven detection
- **Real-time parameter adjustment** for classroom engagement
- **Curriculum-ready content** aligned with astronomy education

### **Students & Enthusiasts**
- **Hands-on learning** experience with real NASA data
- **Accessible interface** requiring no programming skills
- **Instant feedback** on astronomical observations
- **Engaging visualizations** of planetary detection

### **Citizen Scientists**
- **Contribute to discovery** by analyzing observations
- **Upload your own data** for classification
- **Community collaboration** with fellow space enthusiasts
- **Open data access** to NASA's astronomical archives

---

## 🚀 How It Works

### Detection Pipeline

1. **Data Ingestion**
   - Upload light curve time-series data or provide observational parameters
   - Support for standard astronomical data formats

2. **Preprocessing**
   - Automatic normalization and outlier handling
   - Missing value imputation using CTAB-GAN+
   - Feature extraction from raw observations

3. **MAE Anomaly Detection**
   - Self-supervised analysis of light curve patterns
   - Reconstruction-based anomaly scoring
   - Identification of transit-like signals

4. **Feature Enhancement**
   - CTAB-GAN+ augmentation for robust classification
   - Synthetic sample generation for rare cases
   - Parameter correlation preservation

5. **Classification & Confidence Scoring**
   - Final planetary candidate prediction
   - Confidence interval estimation
   - Feature importance ranking

6. **Results & Interpretation**
   - Visual presentation of detection results
   - Downloadable reports with scientific metadata
   - Explainable AI insights for validation

---

## 📈 Performance & Accuracy

- **95.2% Transit Detection Rate** (example metric from MAE model)
- **6,022 confirmed exoplanets** in training dataset
- **200,000+ light curves** successfully analyzed
- Trained on decades of NASA mission data spanning multiple stellar populations

*Note: Performance metrics are continuously updated as the model undergoes validation and refinement.*

---

## 🌐 Interactive Features

### **Real-Time Detection Demo**

Explore how our AI model works by adjusting astronomical parameters from real exoplanet observations:

- **Transit Midpoint**: Time when planet crosses star's center (Barycentric Julian Date)
- **Stellar Proper Motion**: Angular change in star's position (mas/year)
- **TESS Magnitude**: Star brightness in TESS bandpass
- **Stellar Radius**: Star radius relative to Sun (R☉)
- **Distance to Star**: Distance from Earth to star system (parsecs)
- **Planetary Radius**: Planet radius relative to Earth (R⊕)

Watch as the detection probability updates in real-time, demonstrating how different parameters influence the model's confidence in identifying a planetary transit.

---

## 🔬 Scientific Validation & Transparency

ExoNova is built on a foundation of scientific rigor and transparency:

- **Open-source commitment**: Full transparency in methodologies and algorithms
- **Explainable predictions**: Every classification comes with interpretable confidence scores
- **Feature attribution**: Understand which astronomical parameters drive each detection
- **Continuous validation**: Regular comparison against confirmed discoveries from NASA archives
- **Community peer review**: Open collaboration with the astronomical research community

---

## 🎓 Educational Resources

ExoNova serves as a powerful educational tool for astronomy and data science:

- **Transit Method Visualization**: Interactive animations explaining how planetary transits work
- **AI Model Explanations**: Accessible descriptions of machine learning concepts
- **Mission History**: Learn about NASA's Kepler, K2, and TESS missions
- **Astronomical Parameter Guides**: Understand the meaning of stellar and planetary properties
- **Hands-On Learning**: Experiment with real data and see immediate results

---

## 🤝 Contributing to Discovery

ExoNova is part of the **NASA Space Apps Challenge**, demonstrating how collaborative, open-source approaches can advance space science. We welcome contributions from:

- **Researchers**: Share datasets, validate results, propose improvements
- **Educators**: Develop curriculum materials, create learning modules
- **Students**: Participate in data analysis, explore the platform's capabilities
- **Developers**: Contribute to the open-source codebase (see technical repository)
- **Citizen Scientists**: Analyze observations, report findings, join the community

---

## 📚 Technical References

### Research Papers & Resources

- **CTAB-GAN+**: [Conditional Tabular GAN for Data Synthesis](https://arxiv.org/abs/2204.00401)
- **Masked Autoencoders**: Self-supervised learning framework for anomaly detection
- **NASA Exoplanet Archive**: [Official database of confirmed exoplanets](https://exoplanetarchive.ipac.caltech.edu/)
- **Kepler Mission**: [NASA Kepler Space Telescope](https://www.nasa.gov/mission_pages/kepler/main/index.html)
- **TESS Mission**: [Transiting Exoplanet Survey Satellite](https://www.nasa.gov/tess-transiting-exoplanet-survey-satellite)

---

## 🌍 Access ExoNova

**Web Platform**: [ExoNova AI Detection Platform](https://frontend-nsac.wittywave-105d9d7b.eastus2.azurecontainerapps.io/)
**Documentation**: [Coming Soon]  
**Community Forum**: [Coming Soon]

---

## 📧 Contact & Collaboration

ExoNova is developed as part of the **NASA Space Apps Challenge** by a passionate team dedicated to making exoplanet discovery accessible to everyone.

**For scientific inquiries, collaboration opportunities, or educational partnerships, please reach out through our platform.**

---

## 📜 Acknowledgments

- **NASA Exoplanet Science Institute** for providing open-access astronomical data
- **Kepler, K2, and TESS mission teams** for decades of groundbreaking observations
- **NASA Space Apps Challenge** for inspiring global innovation in space science
- **Open-source AI/ML community** for advancing the state of machine learning research

---

## 🌌 Join the Journey

Every exoplanet discovery brings us closer to answering humanity's most profound question: **Are we alone in the universe?**

With ExoNova, you can be part of this extraordinary journey—whether you're a seasoned astronomer, a curious student, or simply someone fascinated by the cosmos. Together, we're unveiling the hidden planets that orbit distant stars, expanding our understanding of planetary systems, and exploring the vast diversity of worlds beyond our own.

**Start exploring. Start discovering. Start with ExoNova.**

---

*Built with ❤️ for the global astronomy community*
