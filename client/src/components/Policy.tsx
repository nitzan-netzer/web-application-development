'use client';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Policy() {
    const [openSection, setOpenSection] = useState<number | null>(null);

    const toggleSection = (section: number) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="container mt-5 text-center" dir="rtl" style={{ color: '#3e2723', backgroundColor: '#e0f2f1', padding: '20px', borderRadius: '10px' }}>
            
            <p className="lead" style={{ maxWidth: '700px', margin: '0 auto', color: '#2e7d32' }}>
                <strong>ברוכים הבאים לאתר החנות שלנו!</strong> התקנון הבא מסדיר את נהלי האתר, תנאי השימוש, המכירה והקנייה, והגינות המסחר באתר. אנא קראו בעיון את התקנון לפני השימוש באתר. השימוש באתר מהווה הסכמה לתנאים המפורטים להלן.
            </p>

            <div className="accordion mb-4" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(1)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            1. שעות פעילות
                        </h2>ע
                    </div>
                    {openSection === 1 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            האתר פעיל 24 שעות ביממה, שבעה ימים בשבוע.
                            <br />
                            תמיכה טכנית ושירות לקוחות זמינים בין השעות 09:00 - 18:00, בימים ראשון עד חמישי.
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(2)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            2. מכירה
                        </h2>
                    </div>
                    {openSection === 2 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            כל הפריטים המוצעים למכירה באתר הם פריטים יד שנייה במצב טוב.
                            <br />
                            תיאור המוצר באתר נועד לספק את כל המידע הנחוץ, כולל תמונות ומצב הפריט.
                            <br />
                            כל הפריטים נבדקים טרם פרסומם למכירה, ומובטח כי הם במצב תקין, אלא אם כן מצוין אחרת.
                            <br />
                            לאחר ביצוע רכישה, לא תתאפשר החלפה או ביטול אלא אם כן הוכח כי המוצר שהתקבל אינו תואם את התיאור באתר.
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(3)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            3. קנייה
                        </h2>
                    </div>
                    {openSection === 3 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            על הרוכש לוודא כי הפרטים שהוזנו בעת ההזמנה נכונים ומלאים.
                            <br />
                            התשלום עבור הפריטים יבוצע דרך פלטפורמות תשלום מאובטחות המקובלות באתר.
                            <br />
                            לאחר השלמת ההזמנה, אישור הזמנה יישלח בדוא"ל.
                            <br />
                            זמן המשלוח עשוי להשתנות בהתאם למקום המגורים של הרוכש, אך ישנה התחייבות לספק את המוצרים תוך 7 ימי עסקים.
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(4)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            4. הגינות
                        </h2>
                    </div>
                    {openSection === 4 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            החנות מתחייבת לפעול בהגינות ובשקיפות מול הלקוחות, ולספק מידע מהימן ומדויק אודות הפריטים הנמכרים.
                            <br />
                            האתר שומר לעצמו את הזכות לסרב למכור או לבטל הזמנה במקרה של הפרה של תנאי השימוש באתר או חשד לפעילות לא הוגנת.
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(5)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            5. שירות לקוחות
                        </h2>
                    </div>
                    {openSection === 5 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            במקרים של בעיות או תלונות, ניתן לפנות לשירות הלקוחות דרך טופס יצירת קשר באתר או באמצעות דוא"ל.
                            <br />
                            כל פנייה תיענה תוך 2 ימי עסקים.
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(6)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            6. קניין רוחני
                        </h2>
                    </div>
                    {openSection === 6 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            כל התכנים, התמונות והמידע באתר מוגנים בזכויות יוצרים ואין להעתיקם, לשכפלם או לעשות בהם שימוש ללא אישור מפורש בכתב מהנהלת האתר.
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(7)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            7. שינויים בתקנון
                        </h2>
                    </div>
                    {openSection === 7 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            האתר שומר לעצמו את הזכות לעדכן את התקנון מעת לעת. העדכונים ייכנסו לתוקף מרגע פרסומם באתר.
                            <br />
                            השימוש המתמשך באתר מהווה הסכמה לתנאי התקנון המעודכנים.
                        </div>
                    )}
                </div>

                <div className="card">
                    <div className="card-header text-center" onClick={() => toggleSection(8)} style={{ backgroundColor: '#4caf50', color: 'white', cursor: 'pointer' }}>
                        <h2 className="mb-0">
                            8. סמכות שיפוט
                        </h2>
                    </div>
                    {openSection === 8 && (
                        <div className="card-body text-end" style={{ backgroundColor: '#a5d6a7' }}>
                            התקנון כפוף לחוקי מדינת ישראל וכל סכסוך שיתעורר בקשר לשימוש באתר יובא להכרעת בתי המשפט המוסמכים בישראל בלבד.
                        </div>
                    )}
                </div>
            </div>

            <p className="text-muted text-center" style={{ color: '#5d4037' }}>
                <strong>תודה על בחירתכם בחנות שלנו!</strong>
            </p>
        </div>
    );
}

